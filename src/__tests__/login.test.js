const login = require("../login");

beforeAll(() => jest.setTimeout(10 * 1000));

test("check login with wrong credientials", async () => {
	const event = {
		version: "2.0",
		routeKey: "POST /users/login",
		rawPath: "/users/login",
		rawQueryString: "",
		headers: {
			accept: "*/*",
			"content-length": "46",
			"content-type": "application/json",
			host: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
			"user-agent": "insomnia/2021.5.3",
			"x-amzn-trace-id": "Root=1-61710215-020164035f0c4bcf319aa273",
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
				method: "POST",
				path: "/users/login",
				protocol: "HTTP/1.1",
				sourceIp: "175.157.46.36",
				userAgent: "insomnia/2021.5.3",
			},
			requestId: "Hi1DajLYIAMESOg=",
			routeKey: "POST /users/login",
			stage: "$default",
			time: "21/Oct/2021:06:00:53 +0000",
			timeEpoch: 1634796053638,
		},
		body: '{\n\t"userName":"yathu",\n\t"password":"1234533"\n}',
		isBase64Encoded: false,
	};

	const result = await login.handler(event);
	expect(result.statusCode).toBe(200);
	const body = JSON.parse(result.body);
	expect(body.status).toBe("failed");
	expect(body.error).toBe("Credientials does not match");
});

test("check login with correct credientials", async () => {
	const event = {
		version: "2.0",
		routeKey: "POST /users/login",
		rawPath: "/users/login",
		rawQueryString: "",
		headers: {
			accept: "*/*",
			"content-length": "46",
			"content-type": "application/json",
			host: "r2t87um6qk.execute-api.us-east-1.amazonaws.com",
			"user-agent": "insomnia/2021.5.3",
			"x-amzn-trace-id": "Root=1-61710215-020164035f0c4bcf319aa273",
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
				method: "POST",
				path: "/users/login",
				protocol: "HTTP/1.1",
				sourceIp: "175.157.46.36",
				userAgent: "insomnia/2021.5.3",
			},
			requestId: "Hi1DajLYIAMESOg=",
			routeKey: "POST /users/login",
			stage: "$default",
			time: "21/Oct/2021:06:00:53 +0000",
			timeEpoch: 1634796053638,
		},
		body: '{\n\t"userName":"yathu",\n\t"password":"123456"\n}',
		isBase64Encoded: false,
	};

	const result = await login.handler(event);
	expect(result.statusCode).toBe(200);
	const body = JSON.parse(result.body);
	expect(body.status).toBe("success");
	expect(body.data).toHaveProperty("token");
});
