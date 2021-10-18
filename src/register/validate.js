const countryList = require("./countryList");
const countryCodeList = require("./countryCodeList");

var error = "";

const validateFirstName = (firstName) => {
	if (firstName.length < 4) {
		error = "First Name must be at least 4 characters long!";
		return false;
	} else {
		return true;
	}
};

const validateLastName = (lastName) => {
	if (lastName.length < 4) {
		error = "Last Name must be at least 4 characters long!";
		return false;
	} else {
		return true;
	}
};

const validateUserName = (userName) => {
	var re = /^(\w)+$/;
	if (re.test(userName)) {
		if (userName.length < 4) {
			error = "Username must be at least 4 characters long!";
			return false;
		} else {
			return true;
		}
	} else {
		error = "Only leters, numbers and underscores are valid for username!";
		return false;
	}
};

const validateEmail = (email) => {
	var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (re.test(email)) {
		return true;
	} else {
		error = "Email is not valid!";
		return false;
	}
};

const validatePassword = (password) => {
	if (password.indexOf(" ") === -1) {
		if (password.length < 6) {
			error = "Password must be at least 6 characters long!";
			return false;
		} else {
			return true;
		}
	} else {
		error = "Password cannot contain white spaces!";
		return false;
	}
};

const validateState = (state) => {
	if (state.length < 3) {
		error = "State must be at least 3 characters long!";
		return false;
	} else {
		return true;
	}
};

const validateCountryCode = (code) => {
	let codes = countryCodeList.map((a) => a.code);
	if (codes.includes(code)) {
		return true;
	} else {
		return false;
	}
};

const validatePhoneNumber = (value) => {
	if (isNaN(value)) {
		return false;
	} else {
		if (value.length < 8 || value.length > 13) {
			return false;
		} else {
			return true;
		}
	}
};

const validate = (user) => {
	try {
        let dob=user.dob && user.dob.split("T")[0]
		user = {
			firstName: user.firstName && user.firstName.trim(),
			lastName: user.lastName && user.lastName.trim(),
			userName: user.userName && user.userName.trim(),
			password: user.password && user.password.trim(),
			dob: dob,
			email: user.email && user.email.trim(),
			country: user.country && user.country.trim(),
			state: user.state && user.state.trim(),
			mobileCountryCode: user.mobileCountryCode && user.mobileCountryCode.trim(),
			mobileNumber: user.mobileNumber && user.mobileNumber.toString().trim(),
			phoneCountryCode: user.phoneCountryCode && user.phoneCountryCode.trim(),
			phoneNumber: user.phoneNumber && user.phoneNumber.toString().trim(),
		};

		if (
			!(
				user.firstName &&
				user.lastName &&
				user.userName &&
				user.password &&
				user.email &&
				user.dob &&
				user.country &&
				user.state &&
				user.mobileCountryCode &&
				user.mobileNumber
			)
		) {
			error = "Some values are missing!";
			return { valid: false, error: error };
		}

		if (!validateFirstName(user.firstName)) {
			return { valid: false, error: error };
		}

		if (!validateLastName(user.lastName)) {
			return { valid: false, error: error };
		}

		if (!validateUserName(user.userName)) {
			return { valid: false, error: error };
		}

		if (!validateEmail(user.email)) {
			return { valid: false, error: error };
		}

		if (!validatePassword(user.password)) {
			return { valid: false, error: error };
		}

		if (!countryList.includes(user.country)) {
			error = "Country is not valid!";
			return { valid: false, error: error };
		}

		if (!validateState(user.state)) {
			return { valid: false, error: error };
		}

		if (!validateCountryCode(user.mobileCountryCode)) {
			error = "Mobile country code is not valid";
			return { valid: false, error: error };
		}

		if (!validatePhoneNumber(user.mobileNumber)) {
			error = "Mobile number is not valid";
			return { valid: false, error: error };
		}

		if (user.phoneCountryCode && user.phoneNumber) {
			if (!validateCountryCode(user.phoneCountryCode)) {
				error = "Phone country code is not valid";
				return { valid: false, error: error };
			}

			if (!validatePhoneNumber(user.phoneNumber)) {
				error = "Phone number is not valid";
				return { valid: false, error: error };
			}
		} else {
			user.phoneNumber = null;
			user.phoneCountryCode = null;
		}
		return { valid: true, user: user };
	} catch (e) {
		console.log(e);
		return { valid: false, error: "some validation error occured" };
	}
};

module.exports = validate;
