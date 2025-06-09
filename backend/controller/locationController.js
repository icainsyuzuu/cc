import { Location } from '../model/location.js';
import { Sequelize } from 'sequelize';

async function getNearbyLocations(req, res) {
    const { lat, lon, radius = 5 } = req.query; // radius default 5 km

    if (!lat || !lon) {
        return res.status(400).json({ success: false, message: 'Latitude dan longitude diperlukan' });
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

        if (locations.length === 0) {
            return res.status(404).json({ success: false, message: 'Tidak ditemukan lokasi dalam radius tersebut' });
        }

        res.json({ success: true, data: locations });
    } catch (error) {
        console.error("Nearby location error:", error);
        res.status(500).json({ success: false, message: 'Kesalahan server' });
    }
}

export {
    getNearbyLocations
};
