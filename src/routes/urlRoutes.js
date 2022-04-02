import express from "express";
import url from "../controllers/urlController.js";
import urlValidator from "../validators/urlValidator.js";
import validateResult from "../middleware/validate.js";

const router = express.Router();

router.get("/test", url.test);

router.get("/:short_id", url.get);

router.post("/", url.create);

export default router;
