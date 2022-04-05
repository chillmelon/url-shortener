import nanoid from "../helper/nanoid.js";
import { validationResult } from "express-validator";
import Url from "../models/url.js";
import { baseUrl } from "../config/urlConfig.js";

const urlController = {
	async test(_req, res) {
		try {
			let result = await Url.test();
			if (result) {
				res.status(200).json(result);
			}
		} catch (err) {
			console.error(err);
			return res.status(500).json("Something went wrong.");
		}
	},

	async get(req, res) {
		const id = req.params.id;

		try {
			let result = await Url.get(id);

			// if no result, return 404
			if (!result[0]?.url) {
				return res.status(404).send("Url not found.");
			}

			// redirect to origin url
			let url = result[0].url;
			return res.redirect(301, url);
		} catch (err) {
			console.error(err);
			return res.status(500).json("Something went wrong.");
		}
	},

	async create(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).send(errors);
		}

		const url = req.body.url;
		const expireAt  = req.body.expireAt;

		let newUrl = {
			url,
			expireAt,
		};

		let retry = 0;

		// try 3 times, return 500 at the 3rd time.
		while (retry < 3) {
			retry++;

			newUrl.id = nanoid();

			try {
				let result = await Url.create(newUrl);

				// if success, return id and shortUrl
				if (result.affectedRows > 0) {
					let id = newUrl.id
					let shortUrl = new URL(id, baseUrl);

					let data = {
						id,
						shortUrl,
					};

					return res.status(200).json(data);
				}

			} catch (err) {

				// if duplicate, try again
				if (err.code == "ER_DUP_ENTRY" && retry < 3) {
					console.error("Duplicate id");
					continue;

					// if other error, return 500
				} else {
					console.error(err);
					return res.status(500).json("Something went wrong.");
				}
			}
		}
	},
};

export default urlController;
