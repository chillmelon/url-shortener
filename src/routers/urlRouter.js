import express from "express";
import url from "../controllers/urlController.js";
import urlValidator from "../validators/urlValidator.js";

const urlRouter = express.Router();

urlRouter.get("/test", url.test);

urlRouter.post("/api/v1/urls", urlValidator(), url.create);

urlRouter.get("/:id", url.get);


export default urlRouter;
