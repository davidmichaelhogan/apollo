'use strict';
module.exports = (sequelize, DataTypes) => {
  const Geo = sequelize.define('Geo', {
    name: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    long: DataTypes.INTEGER,
    radius: DataTypes.INTEGER
  }, {});
  Geo.associate = function(models) {
    // associations can be defined here
  };
  return Geo;
};