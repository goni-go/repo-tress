import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import env from "./config/env";
import logger from "./helpers/logger";
import { createRepoTreeController } from "./controllers/repos-tree";
import { validateHeaders } from "./middlewares/headers-validation";
import { validateRepoExitsence } from "./middlewares/repos-validation";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
// TODO verify
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

// log request - response
app.use((req, res, next) => {
    logger.info(`METHOD: [${req.method}] - URL: [${req.url}]`); // log request
    res.on("finish", () => { logger.info(`METHOD: [${req.method}] - STATUS: [${res.statusCode}]`); }); // log response
    next();
});

// Routes
app.get("/repos-trees",
    validateHeaders,
    validateRepoExitsence,
    createRepoTreeController
);

app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default app;
