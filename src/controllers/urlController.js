import nanoid from "../helper/nanoid.js";
import { validationResult } from "express-validator";
import Url from "../models/url.js";

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
		const short_id = req.params.short_id;

		try {
			let result = await Url.get(short_id);

			// if no result, return 404
			if (!result[0]?.long_url) {
				console.error(result);
				return res.status(404).send("Url not found.");
			}

			// redirect to long_url
			let long_url = result[0].long_url;
			return res.redirect(301, long_url);
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

		const long_url = req.body.url;
		const expiration_date  = req.body.expiration_date;

		let new_url = {
			long_url: long_url,
			expiration_date: expiration_date,
		};

		let retry = 0;

		// try 3 times, return 500 at the 3rd time.
		while (retry < 3) {
			retry++;

			new_url.short_id = nanoid();

			try {
				let result = await Url.create(new_url);

				if (result.affectedRows > 0) {
					return res.status(200).json(new_url.short_id);
				}
			} catch (err) {
				// if duplicate, try again
				if (err.code == "ER_DUP_ENTRY" && retry < 3) {
					console.error("duplicate id");
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
