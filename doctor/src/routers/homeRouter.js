import express from "express";
import routes from "../routes";
import { home } from "../controllers/homeController";

const homeRouter = express.Router();
homeRouter.get(routes.home, home);

export default homeRouter;
