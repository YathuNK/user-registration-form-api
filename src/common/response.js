// set custom headers and send response
function buildResponse(statusCode, body) {
	return {
		statusCode: statusCode,
		headers: {
			"Access-Control-Allow-Headers": "*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	};
}

module.exports.buildResponse = buildResponse;
