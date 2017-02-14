var db = require("./../models");
var bcrypt = require('bcrypt-nodejs');

usersignup = {
	validate: (data,req,res) => {
		let	username = data.username,
			email = data.email,
			password = data.password,
			password2 = data.password2;

		if (!username || !email || !password || !password2) {
			req.flash('error', "Please, fill fill out all entries");
   			res.redirect('register');
   			return;
		}

		if (password !== password2) {
			req.flash('error', "Passwords do not match");
			res.redirect('register');
			return;
		}

		if (username.length < 5) {
			req.flash('error', "Username too short");
			res.redirect('register');
			return;
		}

		if (password.length < 5) {
			req.flash('error', "Password too short");
			res.redirect('register');	
			return;		
		}

		let salt = '$2a$04$' + [...password].filter((a,i) => i<5).join('');
		let hashpassword = bcrypt.hashSync(password, salt);

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