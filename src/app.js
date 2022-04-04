import express from "express";
import cors from "cors";
import apiRouter from "./routers/index.js";

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

app.use((_req, res) => {
	res.status(404).send("Unknown request");
});

app.listen(port, () => {
	console.info(`server is now running on port ${port}`);
});
