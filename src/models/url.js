import db from "./db.js";

const Url = {

	async test () {

		try {

			let sql = "SELECT NOW();"
			let result = await db.pool.query(sql);
			return result;

		} catch (err) {

			throw err;

		}
	},


	// get long_url from db by giving short_id
	async get(short_id) {
		let sql = "SELECT * FROM urls WHERE id = ?"
		let result = await db.pool.query(sql, short_id);
		return result;
	},

	// create a record with given long_url and expiration_date in db
	async create(url) {
		try {

			let sql = "INSERT INTO urls (id, long_url, expiration_date) values (?, ?, ?);";

			let result = await db.pool.query(
				sql,
				[
					url.short_id,
					url.long_url,
					url.expiration_date,
				],
			);

			return result;

		} catch (err) {

			throw err;

		}
	},

};

export default Url;
