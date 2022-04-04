import db from "./db.js";

const Url = {
	async test() {
		const sql = "SELECT NOW();";

		return db.pool.query(sql);
	},

	// get long_url from db by giving short_id
	async get(short_id) {
		const sql = "SELECT * FROM urls WHERE id = ? AND expiration_date > NOW()";

		return db.pool.query(sql, short_id);
	},

	// create a record with given long_url and expiration_date in db
	async create(url) {
		const sql = "INSERT INTO urls (id, long_url, expiration_date) values (?, ?, ?);";

		return db.pool.query(sql, [url.short_id, url.long_url, url.expiration_date]);
	},
};

export default Url;
