const dbConfig = {
	host: process.env.DB_HOST || "127.0.0.1",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "secret",
	database: process.env.DB_DATABASE || "url",
};

export default dbConfig;
