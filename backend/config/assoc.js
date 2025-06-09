//use required to import models
const  Location = require('../model/location.js');
const WasteRecord = require('../model/wasteRecord.js');
const User = require('../model/user.js');
const sequelize = require('./db.js');
const Waste = require('../model/waste.js');
const associateModels = () => {
    try {
        // User associations
        User.hasMany(WasteRecord, {
            foreignKey: 'user_id',
            as: 'wasteRecords',
            onDelete: 'CASCADE', // Optional: delete waste records when user is deleted
            onUpdate: 'CASCADE' // Optional: update waste records when user is updated
        });
        WasteRecord.belongsTo(User, {
            foreignKey: 'user_id',
            as: 'user'
        });

        // Location associations
        Location.hasMany(WasteRecord, {
            foreignKey: 'location_id',
            as: 'wasteRecords',
            onDelete: 'CASCADE', // Optional: delete waste records when location is deleted
            onUpdate: 'CASCADE' // Optional: update waste records when location is updated
        });
        WasteRecord.belongsTo(Location, {
            foreignKey: 'location_id',
            as: 'location'
        });

        Waste.hasMany(WasteRecord, {
            foreignKey: 'waste_id',
            as: 'wasteRecords',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        WasteRecord.belongsTo(Waste, {
            foreignKey: 'waste_id',
            as: 'waste'
        });
        // Sync associations
        sequelize.sync()
            .then(() => {
                console.log("Associations have been established and database synced successfully.");
            })
            .catch(error => {
                console.error("Error syncing database:", error);
            });

    } catch (error) {
        console.error("Error in associateModels:", error);
    }
}

module.exports = associateModels;