import express from "express";
import urlRoutes from "./urlRoutes.js";
const api = express.Router();

api.get("/", (req, res) => {
	res.send("welcome to url shortener");
});

api.use("/url", urlRoutes);

export default api;
