import dashboardRouter from "./dashboard-route.js"
import createAttackRouter from "./createAttack-route.js"
import getLogsRouter from "./getlogs-route.js"

const registerRoutes = (app) => {
    app.use("/dashboard", dashboardRouter);
    app.use("/attack", createAttackRouter)
    app.use("/getlogs", getLogsRouter)
    app.use("/", dashboardRouter);
  app.use("/*", dashboardRouter);
};

export default registerRoutes;
