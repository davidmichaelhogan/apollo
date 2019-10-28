"use strict";
module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define(
    "Campaign",
    {
      isActive: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      deliveryDate: DataTypes.DATE,
      cost: DataTypes.INTEGER,
      cpm: DataTypes.INTEGER,
      balance: DataTypes.INTEGER
    },
    {}
  );
  Campaign.associate = function(models) {
    Campaign.belongsTo(models.Advertiser);
    Campaign.hasMany(models.Ad);
  };
  return Campaign;
};
