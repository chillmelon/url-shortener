import db from "./db.js";

const Url = {
	async test() {
		const sql = "SELECT NOW();";

		return db.pool.query(sql);
	},

	// get long_url from db by giving short_id
	async get(id) {
		const sql = "SELECT * FROM urls WHERE id = ? AND expireAt > NOW()";

		return db.pool.query(sql, id);
	},

	// create a record with given long_url and expiration_date in db
	async create(url) {
		const sql = "INSERT INTO urls (id, url, expireAt) values (?, ?, ?);";

		return db.pool.query(sql, [url.id, url.url, url.expireAt]);
	},
};

export default Url;
