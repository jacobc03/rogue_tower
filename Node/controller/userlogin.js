var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
var db = require("./../models");
var bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(
	function(username, password, done) {
		db.user.findOne({where: { username: username }}).then(function(user){
			if (!user) {
				console.log('Incorrect username.');
				return done(null, false, {message: 'Incorrect username.'});
			}
			let salt = bcrypt.genSaltSync(4);
			let hashpassword = bcrypt.hashSync(password, salt);
			console.log(hashpassword);
			if (user.dataValues.password != hashpassword) {
				console.log("Incorrect password.");
				return done(null, false, {message: 'Incorrect password.'});
			}
			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	db.user.findOne({
		where: {
			id: id
		}
	}).then(function (user) {
		if (user == null) {
			done(new Error('Wrong user id.'))
		}
		done(null, user)
	})
})