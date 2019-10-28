"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      type: DataTypes.STRING,
      date: DataTypes.DATE,
      data: DataTypes.JSON
    },
    {}
  );
  Event.associate = function(models) {
    Event.belongsTo(models.Ad);
    Event.belongsTo(models.Site);
  };
  return Event;
};
