const jwt = require("jsonwebtoken");
const config = require("./config");

// generate jwt token with given object
function generateToken(user) {
	if (!user) {
		return null;
	}

	return jwt.sign(user, config.jwt_secret, {
		expiresIn: 600,
	});
}

// verify token and exract user object from it
function verifyToken(token) {
	if (!token) {
		return {
			verified: false,
			message: "token required",
		};
	}
	return jwt.verify(token, config.jwt_secret, (error, response) => {
		console.log({ error, response });
		if (error) {
			if (error instanceof jwt.TokenExpiredError) {
				return {
					verified: false,
					message: "token expired",
				};
			}
			return {
				verified: false,
				message: "invalid token",
			};
		}
		return {
			verified: true,
			message: "verifed",
			user: response,
		};
	});
}

module.exports = { generateToken, verifyToken };
