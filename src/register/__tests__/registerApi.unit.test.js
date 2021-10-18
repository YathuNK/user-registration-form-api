const register = require("../register");

beforeAll(() => jest.setTimeout(10 * 1000))

test("check Register with already existing username", async () => {
	const event = {
		version: "2.0",
		routeKey: "POST /users",
		rawPath: "/users",
		rawQueryString: "",
		headers: {
			accept: "*/*",
			"content-length": "329",
			"content-type": "application/json",
			host: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
			"user-agent": "insomnia/2021.5.3",
			"x-amzn-trace-id": "Root=1-616c5e68-1df298ba470a8c9f2267b8e4",
			"x-forwarded-for": "175.157.40.102",
			"x-forwarded-port": "443",
			"x-forwarded-proto": "https",
		},
		requestContext: {
			accountId: "747609330153",
			apiId: "r2t87um6qk",
			domainName: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
			domainPrefix: "r2t87um6qk",
			http: [Object],
			requestId: "HXOwbgfloAMEJOQ=",
			routeKey: "POST /users",
			stage: "$default",
			time: "17/Oct/2021:17:33:28 +0000",
			timeEpoch: 1634492008974,
		},
		body:
			"{\n" +
			'\t"firstName": "Yathu",\n' +
			'\t"lastName": "Kahn",\n' +
			'\t"userName": "yathu",\n' +
			'\t"password": "1234533",\n' +
			'\t"dob": "1998-11-22T00:00:00.000Z",\n' +
			'\t"email": "yathurshan.18@cse.mrt.ac.lk",\n' +
			'\t"country": "Sri Lanka",\n' +
			'\t"state": "Northern",\n' +
			'\t"mobileCountryCode": "+94",\n' +
			'\t"mobileNumber": 774501205,\n' +
			'\t"phoneCountryCode": "+94",\n' +
			'\t"phoneNumber": 2145012055\n' +
			"}",
		isBase64Encoded: false,
	};

	const result = await register.handler(event);
	expect(result.statusCode).toBe(400);
	const body = JSON.parse(result.body);
	expect(body.status).toBe("failed");
	expect(body.error).toBe("Username already eist!");
});

test("check Register with invalid user details", async () => {
	const event = {
		version: "2.0",
		routeKey: "POST /users",
		rawPath: "/users",
		rawQueryString: "",
		headers: {
			accept: "*/*",
			"content-length": "329",
			"content-type": "application/json",
			host: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
			"user-agent": "insomnia/2021.5.3",
			"x-amzn-trace-id": "Root=1-616c5e68-1df298ba470a8c9f2267b8e4",
			"x-forwarded-for": "175.157.40.102",
			"x-forwarded-port": "443",
			"x-forwarded-proto": "https",
		},
		requestContext: {
			accountId: "747609330153",
			apiId: "r2t87um6qk",
			domainName: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
			domainPrefix: "r2t87um6qk",
			http: [Object],
			requestId: "HXOwbgfloAMEJOQ=",
			routeKey: "POST /users",
			stage: "$default",
			time: "17/Oct/2021:17:33:28 +0000",
			timeEpoch: 1634492008974,
		},
		body:
			"{\n" +
			'\t"firstName": "Ya",\n' +
			'\t"lastName": "Kahn",\n' +
			'\t"userName": "yathu",\n' +
			'\t"password": "1234533",\n' +
			'\t"dob": "1998-11-22T00:00:00.000Z",\n' +
			'\t"email": "yathurshan.18@cse.mrt.ac.lk",\n' +
			'\t"country": "Sri Lanka",\n' +
			'\t"state": "Northern",\n' +
			'\t"mobileCountryCode": "+94",\n' +
			'\t"mobileNumber": 774501205,\n' +
			'\t"phoneCountryCode": "+94",\n' +
			'\t"phoneNumber": 2145012055\n' +
			"}",
		isBase64Encoded: false,
	};

	const result = await register.handler(event);
	expect(result.statusCode).toBe(200);
	const body = JSON.parse(result.body);
	expect(body.status).toBe("failed");
	expect(body.error).toBe("First Name must be at least 4 characters long!");
});

// test("check Register with correct user details", async () => {
// 	const event = {
// 		version: "2.0",
// 		routeKey: "POST /users",
// 		rawPath: "/users",
// 		rawQueryString: "",
// 		headers: {
// 			accept: "*/*",
// 			"content-length": "329",
// 			"content-type": "application/json",
// 			host: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
// 			"user-agent": "insomnia/2021.5.3",
// 			"x-amzn-trace-id": "Root=1-616c5e68-1df298ba470a8c9f2267b8e4",
// 			"x-forwarded-for": "175.157.40.102",
// 			"x-forwarded-port": "443",
// 			"x-forwarded-proto": "https",
// 		},
// 		requestContext: {
// 			accountId: "747609330153",
// 			apiId: "r2t87um6qk",
// 			domainName: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
// 			domainPrefix: "r2t87um6qk",
// 			http: [Object],
// 			requestId: "HXOwbgfloAMEJOQ=",
// 			routeKey: "POST /users",
// 			stage: "$default",
// 			time: "17/Oct/2021:17:33:28 +0000",
// 			timeEpoch: 1634492008974,
// 		},
// 		body:
// 			"{\n" +
// 			'\t"firstName": "Yathu",\n' +
// 			'\t"lastName": "Kahn",\n' +
// 			'\t"userName": "yathu4",\n' +
// 			'\t"password": "1234533",\n' +
// 			'\t"dob": "1998-11-22T00:00:00.000Z",\n' +
// 			'\t"email": "yathurshan.18@cse.mrt.ac.lk",\n' +
// 			'\t"country": "Sri Lanka",\n' +
// 			'\t"state": "Northern",\n' +
// 			'\t"mobileCountryCode": "+94",\n' +
// 			'\t"mobileNumber": 774501205,\n' +
// 			'\t"phoneCountryCode": "+94",\n' +
// 			'\t"phoneNumber": 2145012055\n' +
// 			"}",
// 		isBase64Encoded: false,
// 	};

// 	const result = await register.handler(event);
// 	expect(result.statusCode).toBe(200);
// 	const body = JSON.parse(result.body);
// 	expect(body.status).toBe("success");
// 	expect(body.message).toBe("Account created successfully");

// 	console.log({ result });
// });
