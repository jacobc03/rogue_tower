var db = require("./../models");
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport, LocalStrategy) {
	passport.use(new LocalStrategy(
		function(username, password, done) {
			db.user.findOne({where: { username: username }}).then(function(user){
				if (!user) {
					console.log('Incorrect username.');
					return done(null, false, {message: 'Incorrect username.'});
				}
				let salt = '$2a$04$HN5eLtLO9ZYs.rHGr' + [...password].filter((a,i) => i<5).join('');
				let hashpassword = bcrypt.hashSync(password, salt);
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

}
