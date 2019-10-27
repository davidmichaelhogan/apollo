'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ad = sequelize.define('Ad', {
    adType: DataTypes.STRING,
    attributes: DataTypes.JSON
  }, {});
  Ad.associate = function(models) {
    // associations can be defined here
  };
  return Ad;
};