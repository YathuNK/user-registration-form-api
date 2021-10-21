"use strict";
const mysql = require("serverless-mysql")();
const config = require("./config");

// singleton design pattern for database instance
var db = (function () {
	// connection stores a reference to the Singleton
	var connection;

	function init() {
		// Singleton

		// Private methods and variables
		mysql.config({
			host: config.database.host,
			database: config.database.database,
			user: config.database.user,
			password: config.database.password,
		});
		mysql.connect();

		// Public  variable
		return mysql;
	}

	return {
		// Get the Singleton connection if one exists
		// or create one if it doesn't
		getConnection: function () {
			if (!connection) {
				connection = init();
			}

			return connection;
		},
	};
})();

module.exports = db;
