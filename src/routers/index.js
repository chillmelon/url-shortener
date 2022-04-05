import express from "express";
import urlRouter from "./urlRouter.js";

const api = express.Router();

api.use("/", urlRouter);

api.get("/", (_req, res) => {
	res.send("welcome to url shortener");
});

export default api;
