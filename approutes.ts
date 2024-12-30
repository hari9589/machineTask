import express from "express";
import authRoutes from "./src/module/auth/routes";

const appRouter = express.Router();


appRouter.use("/api/v1",authRoutes)

export default appRouter;