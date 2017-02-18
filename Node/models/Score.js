module.exports = function(sequelize, DataTypes) {
	var Score = sequelize.define("score", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				is: /^[a-z0-9\_\-]+$/i
			}
		},
		score: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});
	return Score;
};