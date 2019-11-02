// ----------------------------------------------------------------------------------//
// Advertiser Module | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

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
    Advertiser.hasMany(models.Campaign);
  };
  return Advertiser;
};
