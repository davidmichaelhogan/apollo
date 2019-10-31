module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("AdCategories", {
      AdId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("AdCategories");
  }
};
