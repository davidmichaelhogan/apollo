'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    type: DataTypes.STRING,
    siteShown: DataTypes.INTEGER,
    dateShown: DataTypes.DATE,
    userData: DataTypes.JSON
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};