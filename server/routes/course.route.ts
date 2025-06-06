import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, getAllCourses, getAllCoursesAdmin, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";

const courseRouter = express.Router();

courseRouter.post('/create-course', isAuthenticated, authorizedRoles("admin"), uploadCourse);
courseRouter.put('/edit-course/:id', isAuthenticated, authorizedRoles("admin"), editCourse);
courseRouter.get('/get-course/:id',getSingleCourse);
courseRouter.get('/get-courses',getAllCourses);
courseRouter.get('/get-course-content/:id', isAuthenticated, getCourseByUser);
courseRouter.put('/add-question', isAuthenticated, addQuestion);
courseRouter.put('/add-answer', isAuthenticated, addAnswer);
courseRouter.put('/add-review/:id', isAuthenticated, addReview);
courseRouter.put('/add-reply', isAuthenticated, authorizedRoles("admin"), addReplyToReview);
courseRouter.get('/get-all-courses', isAuthenticated, authorizedRoles("admin"), getAllCoursesAdmin);
courseRouter.delete('/delete-course/:id',isAuthenticated, authorizedRoles("admin"), deleteCourse);

export default courseRouter;