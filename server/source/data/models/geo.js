"use strict";
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
    Geo.belongsToMany(models.Ad, { through: "AdSearch" });
  };
  return Geo;
};
