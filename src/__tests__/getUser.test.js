const getUser = require("../getUser");

beforeAll(() => jest.setTimeout(10 * 1000));

test("check getUser with wrong token", async () => {
	const event = {
		version: "2.0",
		routeKey: "GET /users",
		rawPath: "/users",
		rawQueryString: "",
		headers: {
			accept: "*/*",
			authorization:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InlhdGh1IiwiaWQiOjQsImlhdCI6MTYzNDU0MTY3NSwiZXhwIjoxNjM0NTQyMjc1fQ.8bYntRgZR1J2eko5NdfS-26r4rbxKMDmmZIj2TvgRrY",
			"content-length": "0",
			host: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
			"user-agent": "insomnia/2021.5.3",
			"x-amzn-trace-id": "Root=1-617105fe-6cca4cbe31fbeb164f8fa79e",
			"x-forwarded-for": "175.157.46.36",
			"x-forwarded-port": "443",
			"x-forwarded-proto": "https",
		},
		requestContext: {
			accountId: "747609330153",
			apiId: "r2t87um6qk",
			domainName: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
			domainPrefix: "r2t87um6qk",
			http: {
				method: "GET",
				path: "/users",
				protocol: "HTTP/1.1",
				sourceIp: "175.157.46.36",
				userAgent: "insomnia/2021.5.3",
			},
			requestId: "Hi3f2iJtoAMESqQ=",
			routeKey: "GET /users",
			stage: "$default",
			time: "21/Oct/2021:06:17:34 +0000",
			timeEpoch: 1634797054823,
		},
		isBase64Encoded: false,
	};

	const result = await getUser.handler(event);
	expect(result.statusCode).toBe(200);
	const body = JSON.parse(result.body);
	expect(body.status).toBe("failed");
	expect(body.err).toBe("token not valid");
});

// test("check getUser with correct token", async () => {
// 	const event = {
// 		version: "2.0",
// 		routeKey: "GET /users",
// 		rawPath: "/users",
// 		rawQueryString: "",
// 		headers: {
// 			accept: "*/*",
// 			authorization:
// 				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InlhdGh1IiwiaWQiOjEsImlhdCI6MTYzNDc5NzE5MSwiZXhwIjoxNjM0Nzk3NzkxfQ.gP9b6M3-3DG6OUlEGOYdle5Qws8PZCV-n0ObXEMdPU0",
// 			"content-length": "0",
// 			host: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
// 			"user-agent": "insomnia/2021.5.3",
// 			"x-amzn-trace-id": "Root=1-617105fe-6cca4cbe31fbeb164f8fa79e",
// 			"x-forwarded-for": "175.157.46.36",
// 			"x-forwarded-port": "443",
// 			"x-forwarded-proto": "https",
// 		},
// 		requestContext: {
// 			accountId: "747609330153",
// 			apiId: "r2t87um6qk",
// 			domainName: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
// 			domainPrefix: "r2t87um6qk",
// 			http: {
// 				method: "GET",
// 				path: "/users",
// 				protocol: "HTTP/1.1",
// 				sourceIp: "175.157.46.36",
// 				userAgent: "insomnia/2021.5.3",
// 			},
// 			requestId: "Hi3f2iJtoAMESqQ=",
// 			routeKey: "GET /users",
// 			stage: "$default",
// 			time: "21/Oct/2021:06:17:34 +0000",
// 			timeEpoch: 1634797054823,
// 		},
// 		isBase64Encoded: false,
// 	};

// 	const result = await getUser.handler(event);
// 	expect(result.statusCode).toBe(200);
// 	const body = JSON.parse(result.body);
// 	expect(body.status).toBe("success");
// 	expect(body.data).toHaveProperty("id");
// 	expect(body.data).toHaveProperty("firstName");
// 	expect(body.data).toHaveProperty("lastName");
// 	expect(body.data).toHaveProperty("userName");
// 	expect(body.data).not.toHaveProperty("password");
// });
