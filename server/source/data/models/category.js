"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Category.associate = function(models) {
    Category.belongsToMany(models.Ad, { through: "AdSearch" });
    Category.belongsToMany(models.Site, { through: "SiteCategories" });
  };
  return Category;
};
