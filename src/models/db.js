import mariadb from "mariadb";
import dbConfig from "../config/dbConfig.js";

const pool = mariadb.createPool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
})

export default Object.freeze({
	pool:pool,
});
