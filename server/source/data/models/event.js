"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      type: DataTypes.STRING,
      siteShown: DataTypes.INTEGER,
      dateShown: DataTypes.DATE,
      userData: DataTypes.JSON
    },
    {}
  );
  Event.associate = function(models) {
    Event.belongsTo(models.Ad);
  };
  return Event;
};
