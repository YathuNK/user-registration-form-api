"use strict";
const database = require("./common/db");
const db = database.getConnection();
const jwt = require("./common/jwt");
const response = require("./common/response");

const getUser = async (event) => {
	try {
		const token = event.headers["authorization"] || "";

		// check the validity of token
		const auth = jwt.verifyToken(token);
		console.log(auth);

		if (auth.verified && auth.user && auth.user.id) {
			// get user data from database if token valid
			let results = await db.query(
				"SELECT users.*, phoneNumbers.phoneCountryCode,phoneNumbers.phoneNumber FROM users LEFT JOIN phoneNumbers ON users.id=phoneNumbers.id where users.id=?",
				[auth.user.id]
			);
			delete results[0].password;
			console.log(results);

			//response with success statuss ans user details
			return response.buildResponse(200, {
				status: "success",
				data: results[0],
			});
		} else {
			//response with not valid token
			return response.buildResponse(200, {
				status: "failed",
				error: auth.message,
				err: "token not valid",
			});
		}
	} catch (e) {
		console.log(e);
		//response with error message
		return response.buildResponse(400, {
			status: "failed",
			error: "Some error occured",
		});
	}
};

module.exports = {
	handler: getUser,
};
