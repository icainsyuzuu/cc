const Location = require('../model/location');
const Sequelize = require('sequelize');

exports.getNearbyLocations = async (req, res) => {
  const { lat, lon, radius = 5 } = req.query; // radius default 5 km

  if (!lat || !lon) {
    return res.status(400).json({ success: false, message: 'Latitude dan longitude diperlukan' });
  }

  try {
    const locations = await Location.findAll({
      attributes: [
        'id', 'name', 'type', 'latitude', 'longitude', 'address', 'operating_hours', 'contact',
        [
          Sequelize.literal(`(
            6371 * acos(
              cos(radians(${lat}))
              * cos(radians(latitude))
              * cos(radians(longitude) - radians(${lon}))
              + sin(radians(${lat}))
              * sin(radians(latitude))
            )
          )`),
          'distance'
        ]
      ],
      having: Sequelize.literal(`distance < ${radius}`),
      order: Sequelize.literal('distance ASC')
    });

    if (locations.length === 0) {
      return res.status(404).json({ success: false, message: 'Tidak ditemukan lokasi dalam radius tersebut' });
    }

    // Kirim data dengan key "data" agar konsisten dengan frontend
    res.json({ success: true, data: locations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Kesalahan server' });
  }
};

