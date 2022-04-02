import dbConfig from "../config/dbConfig.js";
import mariadb from "mariadb";

const pool = mariadb.createPool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
})

export default Object.freeze({
	pool:pool,
});
