"use strict";
const db = require("./common/db");
const jwt = require("./common/jwt");
const response = require("./common/response");

const getUser = async (event) => {
	try {
		const token =
			event.body?.token ||
			event.query?.token ||
			event.headers["authorization"];

		const auth = jwt.verifyToken(token);

		console.log(auth);
		if (auth.verified && auth.user?.id) {
			let results = await db.query("SELECT users.*, phoneNumbers.phoneCountryCode,phoneNumbers.phoneNumber FROM users LEFT JOIN phoneNumbers ON users.id=phoneNumbers.id where users.id=?", [
				auth.user.id,
			]);
            delete results[0].password
			console.log(results);
			return response.buildResponse(
				200,
				{ status: "success", data: results[0] }
			);
		} else {
			return response.buildResponse(
				200,
				{ status: "failed", error: auth.message, err:"token not valid" }
			);
		}
	} catch (e) {
		console.log(e);
		return response.buildResponse(
			400,
			{ status: "failed", error: "Some error occured" }
		);
	}
};

module.exports = {
	handler: getUser,
};
