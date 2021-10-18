"use strict";
const db = require("./common/db");
const jwt = require("./common/jwt");
const bcrypt = require("bcryptjs");
const response = require("./common/response");

const login = async (event) => {
	try {
		const user = JSON.parse(event.body);

		console.log("user:", user);
		let results = await db.query(
			"SELECT id, password FROM users where userName=?",
			[user.userName.trim()]
		);
		console.log({ results });

		if (!results[0]?.id || !results[0]?.password) {
			return response.buildResponse(200, {
				status: "failed",
				error: "Username does not match",
			});
		}

		const compare = bcrypt.compareSync(user.password, results[0]?.password);

		if (compare && results[0].id) {
			const token = jwt.generateToken({
				userName: user.userName,
				id: results[0].id,
			});
			return response.buildResponse(200, {
				status: "success",
				data: { token },
			});
		} else {
			return response.buildResponse(200, {
				status: "failed",
				error: "Credientials does not match",
			});
		}
	} catch (e) {
		console.log(e);
		return response.buildResponse(400, {
			status: "failed",
			error: "Some error occured",
		});
	}
};

module.exports = {
	handler: login,
};
