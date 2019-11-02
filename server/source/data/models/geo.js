// ----------------------------------------------------------------------------------//
// Geo Module | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

module.exports = (sequelize, DataTypes) => {
  const Geo = sequelize.define(
    "Geo",
    {
      name: DataTypes.STRING,
      lat: DataTypes.INTEGER,
      long: DataTypes.INTEGER,
      radius: DataTypes.INTEGER
    },
    {}
  );
  Geo.associate = function(models) {
    Geo.belongsToMany(models.Ad, { through: "AdGeos" });
  };
  return Geo;
};
