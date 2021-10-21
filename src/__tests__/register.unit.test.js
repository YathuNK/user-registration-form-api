const countryList = require("../register/countryList");
const countryCodeList = require("../register/countryCodeList");
const validate = require("../register/validate");

test("ContryList is a valid object", () => {
	expect(typeof countryList).toBe("object");
});

test("countryCodeList is a valid object", () => {
	expect(typeof countryCodeList).toBe("object");
});

test("validate is a valid function", () => {
	expect(typeof validate).toBe("function");
});

test("check validate function with missing user details", () => {
	const result = validate({
		firstName: "Yathu",
		lastName: "Kahn",
		userName: "yathu",
	});

	expect(result.valid).toBe(false);
	expect(result.error).toBe("Some values are missing!");
});

test("check validate function with invalid user name", () => {
	const result = validate({
		firstName: "Ya",
		lastName: "Kahn",
		userName: "yathu",
		password: "1234533",
		dob: "1998-11-22T00:00:00.000Z",
		email: "yathurshan.18@cse.mrt.ac.lk",
		country: "Sri Lanka",
		state: "Northern",
		mobileCountryCode: "+94",
		mobileNumber: 774501205,
		phoneCountryCode: "+94",
		phoneNumber: 2145012055,
	});
	expect(result.valid).toBe(false);
	expect(result.error).toBe("First Name must be at least 4 characters long!");
});

test("check validate function with invalid email", () => {
	const result = validate({
		firstName: "Yathu",
		lastName: "Kahn",
		userName: "yathu",
		password: "1234533",
		dob: "1998-11-22T00:00:00.000Z",
		email: "yathurshan.18",
		country: "Sri Lanka",
		state: "Northern",
		mobileCountryCode: "+94",
		mobileNumber: 774501205,
		phoneCountryCode: "+94",
		phoneNumber: 2145012055,
	});
	expect(result.valid).toBe(false);
	expect(result.error).toBe("Email is not valid!");
});

test("check validate function with correct user details", () => {
	const result = validate({
		firstName: "Yathu",
		lastName: "Kahn",
		userName: "yathu",
		password: "1234533",
		dob: "1998-11-22T00:00:00.000Z",
		email: "yathurshan.18@cse.mrt.ac.lk",
		country: "Sri Lanka",
		state: "Northern",
		mobileCountryCode: "+94",
		mobileNumber: 774501205,
		phoneCountryCode: "+94",
		phoneNumber: 2145012055,
	});

	expect(result.valid).toBe(true);
});



