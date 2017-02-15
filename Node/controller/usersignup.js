var db = require("./../models");
var bcrypt = require('bcrypt-nodejs');

usersignup = {
	validate: (data,req,res) => {
		let	username = data.username,
			email = data.email,
			password1 = data.password1,
			password2 = data.password2;

		if (!username || !email || !password1 || !password2) {
			console.log('error', "Please, fill fill out all entries")
   			return;
		}

		if (password1 !== password2) {
			console.log('error', "Passwords do not match");
			return;
		}

		if (username.length < 5) {
			console.log('error', "Username too short");
			return;
		}

		if (password1.length < 8) {
			console.log('error', "Password too short");
			return;		
		}

		let salt = '$2a$04$HN5eLtLO9ZYs.rHGr' + [...password1].filter((a,i) => i<5).join('');
		let hashpassword = bcrypt.hashSync(password1, salt);

	/*	var newUser = {
			username: username,
			email: email,
			password: hashpassword
		}	*/

		db.user.create({
			username: username,
			email: email,
			password: hashpassword
		}).then(function(results) {
       		res.redirect('/');
    	});

	}
}

module.exports = usersignup;