import { Location } from '../model/location.js';
import { Sequelize } from 'sequelize';

// Get all locations
async function getAllLocations(req, res) {
    try {
        const locations = await Location.findAll({
            attributes: ['id', 'name', 'province', 'city', 'address', 'latitude', 'longitude', 'waste_type']
        });

        if (!locations.length) {
            return res.status(404).json({
                status: "failed",
                message: 'Tidak ada lokasi ditemukan'
            });
        }

        res.status(200).json({
            status: "success",
            data: locations
        });
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({
            status: "failed",
            message: 'Kesalahan server'
        });
    }
}

// Get nearby locations by lat, lon, radius
async function getNearbyLocations(req, res) {
    const { lat, lon, radius = 5 } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({
            status: "failed",
            message: 'Latitude dan longitude diperlukan'
        });
    }

    try {
        const locations = await Location.findAll({
            attributes: [
                'id', 'name', 'province', 'city', 'address', 'latitude', 'longitude', 'waste_type',
                [
                    Sequelize.literal(`
                        6371 * acos(
                            cos(radians(${lat}))
                            * cos(radians(latitude))
                            * cos(radians(longitude) - radians(${lon}))
                            + sin(radians(${lat}))
                            * sin(radians(latitude))
                        )
                    `),
                    'distance'
                ]
            ],
            having: Sequelize.literal(`distance < ${radius}`),
            order: Sequelize.literal('distance ASC')
        });

        if (!locations.length) {
            return res.status(404).json({
                status: "failed",
                message: 'Tidak ditemukan lokasi dalam radius tersebut'
            });
        }

        res.status(200).json({
            status: "success",
            data: locations
        });
    } catch (error) {
        console.error("Nearby location error:", error);
        res.status(500).json({
            status: "failed",
            message: 'Kesalahan server'
        });
    }
}

export {
    getNearbyLocations,
    getAllLocations
};
