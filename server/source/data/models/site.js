// ----------------------------------------------------------------------------------//
// Site Module | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define(
    "Site",
    {
      isActive: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      pageviewsWTD: DataTypes.INTEGER,
      pageviewsMTD: DataTypes.INTEGER,
      pageviewsAllTime: DataTypes.INTEGER
    },
    {}
  );
  Site.associate = function(models) {
    Site.belongsTo(models.Publisher);
    Site.hasMany(models.Event);
    Site.belongsToMany(models.Category, { through: "SiteCategories" });
  };
  return Site;
};
