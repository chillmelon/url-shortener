import Url from "../models/url.js";
import moment from "moment";
import nanoid from "./idController.js";

const urlController = {

	async test(req, res) {
		try {
			let result = await Url.test();
			if (result) {
				res.status(200).json(result);
			}
		} catch (err) {
			throw err;
		}
	},


	async get(req, res) {
		const short_id = req.params.short_id;
		let result = await Url.get(short_id);
		console.log(result);
		if (!result[0]?.long_url) {
			return res.status(404).send("Url not found.");
		}
		return res.status(200).json(result[0]);
	},


	async create(req, res) {

		const long_url = req.body.long_url;
		const short_id = nanoid();
		const expiration_date = moment(req.body.expiration_date)
														.local()
														.format('YYYY-MM-DD HH:mm:ss');

		const new_url = {
			short_id: short_id,
			long_url: long_url,
			expiration_date: expiration_date,
		};

		let result = await Url.create(new_url);

		if (result.affectedRows > 0) {
			return res.status(200).json(short_id);
		} else {
			return res.status(500).json("something went wrong.");
		}

	},

};

export default urlController;
