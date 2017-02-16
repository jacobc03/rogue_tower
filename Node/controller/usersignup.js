var db = require("./../models");
var bcrypt = require('bcrypt-nodejs');

usersignup = {
	validate: (data, cb) => {
		let	username = data.username,
			email = data.email,
			password1 = data.password1,
			password2 = data.password2;

		if (!username || !email || !password1 || !password2) {
			console.log("Must fill out all entries");
			return cb("Must fill out all entries");
		}

		if (!/^[a-zA-Z0-9_-]*$/.test(username)) {
			console.log("Username can only contain letters, numbers, - or _");
			return cb("Username can only contain letters, numbers, - or _");
		}

		db.user.findOne({where: { username: username }}).then(function(user){
			if (user) {
				console.log("Username already exists");
				return cb("Username already exists");
			}
		}).then(
		db.user.findOne({where: { email: email }}).then(function(user){
			if (user) {
				console.log("Email already exists");
				return cb("Email already exists");
			}
		}))

		if (password1.includes(' ')) {
			console.log("Password can not contain spaces");
			return cb("Password can not contain spaces");
		}

		if (password1 !== password2) {
			console.log("Passwords do not match");
			return cb("Passwords do not match");
		}

		if (username.length < 5) {
			console.log("Username must be atleast 5 characters");
			return cb("Username must be atleast 5 characters");
		}

		if (password1.length < 8) {
			console.log("Password must be atleast 8 characters");
			return cb("Password must be atleast 8 characters");
		}

		let salt = '$2a$04$HN5eLtLO9ZYs.rHGr' + [...password1].filter((a,i) => i<5).join('');
		let hashpassword = bcrypt.hashSync(password1, salt);

		db.user.create({
			username: username,
			email: email,
			password: hashpassword
		}).then(function(results) {
       		cb("Signup successful");
    	});

	}
}

module.exports = usersignup;