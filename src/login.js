"use strict";
const database = require("./common/db");
const db = database.getConnection();
const jwt = require("./common/jwt");
const bcrypt = require("bcryptjs");
const response = require("./common/response");

const login = async (event) => {
	try {
		const user = JSON.parse(event.body);
		console.log("user:", user);

		//check user exist in database
		let results = await db.query(
			"SELECT id, password FROM users where userName=?",
			[user.userName.trim()]
		);
		console.log({ results });

		// response for not valid user username
		if (!results[0] || !results[0].id || !results[0].password) {
			return response.buildResponse(200, {
				status: "failed",
				error: "Username does not match",
			});
		}

		const compare = bcrypt.compareSync(user.password, results[0].password);

		if (compare && results[0].id) {
			const token = jwt.generateToken({
				userName: user.userName,
				id: results[0].id,
			});
			// response with success message and token
			return response.buildResponse(200, {
				status: "success",
				data: { token },
			});
		} else {
			// response for not valid user credientials
			return response.buildResponse(200, {
				status: "failed",
				error: "Credientials does not match",
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
	handler: login,
};
