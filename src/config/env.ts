import logger from "../helpers/logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

const { CLIENT_ID, SECRET_KEY } = process.env;

if (!CLIENT_ID || !SECRET_KEY) {
    logger.error("No client secret. Set CLIENT_ID & SECRET_KEY environment variable. (your GitHub authentication)");
    process.exit(1);
}

const env = {
    CLIENT_ID,
    SECRET_KEY
};

export default env;