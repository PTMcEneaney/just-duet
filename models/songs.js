module.exports = function(sequelize, DataTypes) {
  var Songs = sequelize.define(
    "Songs",
    {
      title: DataTypes.STRING,
      artist: DataTypes.STRING,
      year: DataTypes.INTEGER,
      genre: DataTypes.STRING,
      album: DataTypes.STRING,
      duet: DataTypes.BOOLEAN,
      karafunID: DataTypes.INTEGER,
      spotifyID: DataTypes.STRING,
      youtubeURL: DataTypes.STRING,
      duration: DataTypes.DECIMAL,
      popularity: DataTypes.INTEGER,
      explicit: DataTypes.BOOLEAN,
      languages: DataTypes.STRING,
      lyrics: DataTypes.TEXT
    },
    {
      timestamps: false
    }
  );

  Songs.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Songs.belongsToMany(models.Users, {
      through: "SwingTable",
      as: "userId",
      foreignKey: "users",
      // otherKey: "songId"
    });
  };
  return Songs;
};
