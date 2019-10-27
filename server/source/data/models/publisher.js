'use strict';
module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('Publisher', {
    isActive: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    contactName: DataTypes.STRING,
    contactEmail: DataTypes.STRING,
    contactPhone: DataTypes.STRING
  }, {});
  Publisher.associate = function(models) {
    // associations can be defined here
  };
  return Publisher;
};