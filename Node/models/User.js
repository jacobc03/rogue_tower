module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("user", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				is: /^[a-z0-9\_\-]+$/i
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		},
	});
	return User;
};