import express from "express";
import urlRouter from "./urlRouter.js";

const api = express.Router();

api.get("/", (_req, res) => {
	res.send("welcome to url shortener");
});

api.use("/url", urlRouter);

export default api;
