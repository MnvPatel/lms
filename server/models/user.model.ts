import mongoose, {Document, Model, Schema} from "mongoose";
import bcrypt from "bcryptjs";
require('dotenv').config();
const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import  jwt  from "jsonwebtoken";
export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    },
    role: string;
    isVerified: boolean;
    courses: Array<{courseId: string}>;
    comparePassword(password: string) : Promise<boolean>;
    SignAccessToken:() => string;
    SignRefreshToken: () => string;
}

const userSchema : Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value: string){
                return emailRegexPattern.test(value);
            },
            message: "Please validate your Email"
        },
        unique: true,
    },
    password: {
        type: String,
        // required: [true, "Please enter your password"],
        minlength: [6, "Password should contain atleast 6 Characters"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [
        {
            courseId: String,
        }
    ]
},{timestamps: true})

//hash password
userSchema.pre<IUser>('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash (this.password, 10);
    next();
});

//sign access token 
userSchema.methods.SignAccessToken = function() {
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN || '', {
        expiresIn: "10m",
    });
}

//sign refresh token
userSchema.methods.SignRefreshToken = function() {
    return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN || '', {
        expiresIn: "3d",
    });
}

//compare password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean>{
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default userModel;