module.exports = function(sequelize, DataTypes) {
  var SwingTable = sequelize.define(
    "SwingTable",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Songs",
          key: "id"
        }
      },
      rating: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  );
  return SwingTable;
};
