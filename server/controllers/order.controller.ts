import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import CourseModel from "../models/course.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import redis from "../utils/redis";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//create order
export const createOrder = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {courseId, payment_info} = req.body as IOrder;

        if(payment_info){
            if("id" in payment_info){
                const paymentIntentId = payment_info.id;
                const paymentIntent = await stripe.paymentIntents.retrieve(
                    paymentIntentId
                );

                if(paymentIntent.status !== "succeeded"){
                    return next(new ErrorHandler("Payment not authorized!", 400))
                }
            }
        }

        const user = await userModel.findById(req.user?._id);

        const courseExistInUser = user?.courses.some((course: any) => course._id.toString() === courseId);

        if(courseExistInUser){
            return next(new ErrorHandler("You have already purchased this course", 400));
        }

        const course = await CourseModel.findById(courseId);

        if(!course){
            return next(new ErrorHandler("Course not found", 400));
        }

        const data: any = {
            courseId: course._id,
            userId: user?._id,
            payment_info,
        }

        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric'})
            }
        }

        try {
            if(user){
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData,
                })
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }

        user?.courses.push({courseId});

        if (!req.user?._id) {
            return next(new ErrorHandler("User not authenticated", 401));
        }

        await redis.set(req.user?._id.toString(), JSON.stringify(user));

        await user?.save();

        await NotificationModel.create({
            user: user?._id,
            title: "New Order",
            message: `You have a new order from ${course?.name}`,
        })
        
        // increment purchase count
        course.purchased = (course.purchased || 0) + 1;

        await course.save();

        newOrder(data, res, next);

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

//get all courses -- for admins
export const getAllOrders = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
  try {
    getAllOrdersService(res);
  } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
})

//send stripe publishable key
export const sendStripePublishableKey = CatchAsyncError(async(req:Request, res:Response) => {
    res.status(200).json({
        publishablekey: process.env.STRIPE_PUBLISHABLE_KEY
    })
});

//new payment
export const newPayment = CatchAsyncError(async(req: Request, res: Response, next:NextFunction) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "INR",
            metadata: {
                company: "ELearning"
            },
            automatic_payment_methods : {
                enabled: true,
            }
        })

        res.status(201).json({
            success: true,
            client_secret: myPayment.client_secret
        })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
})