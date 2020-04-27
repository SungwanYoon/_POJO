import express from "express";
import homeRouter from "./routers/homeRouter";
import routes from "./routes";

const app = express();
app.use(routes.home, homeRouter);

export default app;
