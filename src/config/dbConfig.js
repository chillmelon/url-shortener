const config = {

	host: process.env.DB_HOST || "127.0.0.1",
	user: process.env.DB_USER || "dcard",
	password: process.env.DB_PASSWORD || "secret",
	database: process.env.DB_DATABASE || "dcard",

};
export default config;
