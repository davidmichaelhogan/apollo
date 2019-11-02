// ----------------------------------------------------------------------------------//
// Category Module | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Category.associate = function(models) {
    Category.belongsToMany(models.Ad, { through: "AdCategories" });
    Category.belongsToMany(models.Site, { through: "SiteCategories" });
  };
  return Category;
};
