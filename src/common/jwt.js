const jwt = require("jsonwebtoken");
const config = require("./config");

function generateToken(user) {
	if (!user) {
		return null;
	}

	return jwt.sign(user, config.jwt_secret, {
		expiresIn: 600,
	});
}

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
            if(error instanceof jwt.TokenExpiredError){
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
