import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAllCourses, getAllCoursesAdmin, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { updateAccessToken } from "../controllers/user.controller";

const courseRouter = express.Router();

courseRouter.post('/create-course', updateAccessToken, isAuthenticated, authorizedRoles("admin"), uploadCourse);
courseRouter.put('/edit-course/:id', updateAccessToken, isAuthenticated, authorizedRoles("admin"), editCourse);
courseRouter.get('/get-course/:id',getSingleCourse);
courseRouter.get('/get-courses',getAllCourses);
courseRouter.get('/get-course-content/:id', updateAccessToken, isAuthenticated, getCourseByUser);
courseRouter.put('/add-question', updateAccessToken, isAuthenticated, addQuestion);
courseRouter.put('/add-answer', updateAccessToken, isAuthenticated, addAnswer);
courseRouter.put('/add-review/:id', updateAccessToken, isAuthenticated, addReview);
courseRouter.put('/add-reply', updateAccessToken, isAuthenticated, authorizedRoles("admin"), addReplyToReview);
courseRouter.get('/get-all-courses', updateAccessToken, isAuthenticated, authorizedRoles("admin"), getAllCoursesAdmin);
courseRouter.post('/getVdoCipherOTP', generateVideoUrl);
courseRouter.delete('/delete-course/:id', updateAccessToken, isAuthenticated, authorizedRoles("admin"), deleteCourse);

export default courseRouter;