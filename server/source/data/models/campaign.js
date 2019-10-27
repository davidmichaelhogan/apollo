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
      cost: DataTypes.INTEGER,
      cpm: DataTypes.INTEGER,
      balance: DataTypes.INTEGER
    },
    {}
  );
  Campaign.associate = function(models) {
    Capaign.belongsTo(model.Advertiser);
    Campaign.hasMany(model.Ad);
  };
  return Campaign;
};
