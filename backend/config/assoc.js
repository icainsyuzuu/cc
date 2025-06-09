import { Location } from "../model/location.js";
import { User } from "../model/user.js";
import { Waste } from "../model/waste.js";
import { WasteRecord } from "../model/waste_record.js";
import db from "./db.js";
import { Sequelize } from "sequelize";


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

        Waste.hasMany(Location, {
            foreignKey: 'waste_id',
            as: 'Location',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Location.belongsTo(Waste, {
            foreignKey: 'waste_id',
            as: 'waste'
        });

        // Sync associations
        db.sync({ alter: true })
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

export { associateModels };