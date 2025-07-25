import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";
import { updateAccessToken } from "../controllers/user.controller";
const layoutRouter = express.Router();

layoutRouter.post("/create-layout", updateAccessToken, isAuthenticated, authorizedRoles("admin"), createLayout);
layoutRouter.put("/edit-layout", updateAccessToken, isAuthenticated, authorizedRoles("admin"), editLayout);
layoutRouter.get("/get-layout", isAuthenticated, getLayoutByType);

export default layoutRouter;