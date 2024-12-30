import express from "express";
import * as authController from "./controller";
const authRoutes = express.Router();

authRoutes.post("/saveUser",authController.createUser);

authRoutes.get("/getuser",authController.findAllUser);

authRoutes.post("/loginuser",authController.loginUser)

export default authRoutes;