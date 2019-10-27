"use strict";
module.exports = (sequelize, DataTypes) => {
  const Advertiser = sequelize.define(
    "Advertiser",
    {
      isActive: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      contactName: DataTypes.STRING,
      contactEmail: DataTypes.STRING,
      contactPhone: DataTypes.STRING
    },
    {}
  );
  Advertiser.associate = function(models) {
    Advertiser.hasMany(model.Campaign);
  };
  return Advertiser;
};
