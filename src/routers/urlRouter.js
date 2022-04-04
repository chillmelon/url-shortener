import express from "express";
import url from "../controllers/urlController.js";
import urlValidator from "../validators/urlValidator.js";

const urlRouter = express.Router();

urlRouter.get("/test", url.test);

urlRouter.get("/:short_id", url.get);

urlRouter.post("/", urlValidator(), url.create);

export default urlRouter;
