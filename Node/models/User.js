module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("user", {
		username: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true,
			}
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true,
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true,
			}
		},
	});
	return User;
};