import express from "express";
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, RegistrationUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole } from "../controllers/user.controller";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post('/registration', RegistrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser );
userRouter.get('/logout', isAuthenticated, authorizedRoles("admin"), logoutUser );
userRouter.get('/refreshtoken', updateAccessToken);
userRouter.get('/me', updateAccessToken, isAuthenticated, getUserInfo);
userRouter.post('/socialAuth', socialAuth);
userRouter.put('/update-user-info',updateAccessToken, isAuthenticated, updateUserInfo);
userRouter.put('/update-user-password',updateAccessToken, isAuthenticated, updatePassword);
userRouter.put('/update-user-avatar',updateAccessToken, isAuthenticated, updateProfilePicture);
userRouter.get('/get-users',updateAccessToken, isAuthenticated, authorizedRoles("admin"), getAllUsers);
userRouter.put('/update-user-role', updateAccessToken, isAuthenticated, authorizedRoles("admin"), updateUserRole);
userRouter.delete('/delete-user/:id',isAuthenticated, authorizedRoles("admin"), deleteUser);

export default userRouter;