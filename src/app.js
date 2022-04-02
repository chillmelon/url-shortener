import express from "express";
import apiRouter from "./routes/index.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import cors from "cors";

const app = express();

const port = 3000;

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Petstore API",
			version: "1.0.0",
			description: "A simple express urlshortener API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./openapi.yaml"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/", apiRouter);

app.use((req, res) => {
	res.status(404).send("Unknown request");
});

app.listen(port, () => {
	console.info(`server is now running on port ${port}`);
});
