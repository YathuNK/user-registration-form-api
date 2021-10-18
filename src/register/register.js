"use strict";
const validate = require("./validate");
const db = require("../common/db");
const bcrypt = require("bcryptjs");
const response = require("../common/response");

const register = async (event) => {
	try {
		const user = JSON.parse(event.body);
		let valid = validate(user);
		console.log(valid);
		if (valid.valid) {
			const hashedPassword = bcrypt.hashSync(valid.user.password, 10);
			let result = await db.query(
				"INSERT INTO users (firstName, lastName, userName, password, dob, email, country, state, mobileCountryCode, mobileNumber) VALUES (?, ?, ?, ?, ?,?,?, ?, ?,?)",
				[
					valid.user.firstName,
					valid.user.lastName,
					valid.user.userName,
					hashedPassword,
					valid.user.dob,
					valid.user.email,
					valid.user.country,
					valid.user.state,
					valid.user.mobileCountryCode,
					valid.user.mobileNumber,
				]
			);
			if (user.phoneCountryCode && user.phoneNumber) {
				let result2 = await db.query(
					"INSERT INTO phoneNumbers (id, phoneCountryCode, phoneNumber ) VALUES (?, ?, ?)",
					[result.insertId, user.phoneCountryCode, user.phoneNumber]
				);
			}
			return response.buildResponse(200, {
				status: "success",
				message: "Account created successfully",
				data: { result },
			});
		} else {
			return response.buildResponse(200, {
				status: "failed",
				error: valid.error,
			});
		}
	} catch (e) {
		console.log(e);
		let error = "Some error occured";
		if (e.code && e.code == "ER_DUP_ENTRY") {
			error = "Username already eist!";
		}
		return response.buildResponse(400, {
			status: "failed",
			error: error,
		});
	}
};

module.exports = {
	handler: register,
};

// // local debug
// if (require.main=== module)(
//     register()
// )
