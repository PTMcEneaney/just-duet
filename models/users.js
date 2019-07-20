module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define(
    "Users",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  Users.associate = function(models) {
    Users.belongsToMany(models.Songs, {
      through: "SwingTable",
      as: "songs",
      foreignKey: "songId"
    });
  };
  return Users;
};
