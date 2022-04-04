import { body } from "express-validator";
import Url from "../models/url.js";
import urlExistSync from "url-exist-sync"
import moment from "moment";

// format datetime
const DateFormatter = (date) => {
	return moment(date).local().format("YYYY-MM-DD HH:mm:ss");
}

// validation chain
const urlValidator = (value) => {
	return [
		body(
			"url",
			"url must be a valid alive url."
		).exists({ checkFalsy: true }).custom(urlExistSync),

		body(
			"expiration_date",
			"expiration_date must be ISO8601 format."
		).exists({ checkFalsy: true }).isISO8601().customSanitizer(DateFormatter),
	];
};

export default urlValidator;
