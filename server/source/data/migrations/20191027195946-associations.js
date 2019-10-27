module.exports = {
  up: (queryInterface, Sequelize) => {
    // Ad belongsTo Campaign
    return queryInterface
      .addColumn(
        "Ads", // name of Source model
        "CampaignId", // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Campaigns", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      )
      .then(() => {
        // Ad hasMany Events
        return queryInterface.addColumn(
          "Events", // name of Target model
          "AdId", // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Ads", // name of Source model
              key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          }
        );
      })
      .then(() => {
        // Advertiser hasMany Campaigns
        return queryInterface.addColumn(
          "Campaigns", // name of Target model
          "AdvertiserId", // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Advertisers", // name of Source model
              key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          }
        );
      })
      .then(() => {
        // Advertiser hasMany Campaigns
        return queryInterface.addColumn(
          "Sites", // name of Target model
          "PublisherId", // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Publishers", // name of Source model
              key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          }
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    // remove Order belongsTo Customer
    return queryInterface
      .removeColumn(
        "Ads", // name of Source model
        "CampaignId" // key we want to remove
      )
      .then(() => {
        // remove Order hasMany Product
        return queryInterface.removeColumn(
          "Events", // name of the Target model
          "AdId" // key we want to remove
        );
      })
      .then(() => {
        // remove Order hasMany Product
        return queryInterface.removeColumn(
          "Campaigns", // name of the Target model
          "AdvertiserId" // key we want to remove
        );
      })
      .then(() => {
        // remove Order hasMany Product
        return queryInterface.removeColumn(
          "Sites", // name of the Target model
          "PublisherId" // key we want to remove
        );
      });
  }
};
