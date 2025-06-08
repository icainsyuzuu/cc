require('dotenv').config();
const fetch = require('node-fetch');
const sequelize = require('../config/db');  // import db sequelize instance
const Location = require('../model/location');

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? '***' : '(empty)');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);

async function fetchAndSaveLocations() {
  const url = 'https://nominatim.openstreetmap.org/search?q=bank+sampah&format=json&limit=10';

  try {
    await sequelize.authenticate(); // test koneksi db terlebih dahulu

    const response = await fetch(url, {
      headers: { 'User-Agent': 'EcoWasteManagerApp/1.0 (your_email@example.com)' }
    });

    const data = await response.json();

    for (const item of data) {
  // parse lat dan lon ke float untuk perbandingan yang benar
  const lat = parseFloat(item.lat);
  const lon = parseFloat(item.lon);

  const exists = await Location.findOne({
    where: {
      latitude: lat,
      longitude: lon,
    }
  });

  if (!exists) {
    await Location.create({
      name: item.display_name.split(',')[0] || 'Bank Sampah',
      type: 'Bank Sampah', // Enum harus sesuai dengan yang didefinisikan di model
      latitude: lat,
      longitude: lon,
      address: item.display_name,
      operating_hours: null,
      contact: null,
    });
    console.log(`Saved location: ${item.display_name}`);
  } else {
    console.log(`Location already exists: ${item.display_name}`);
      }
    }

    await sequelize.close(); // tutup koneksi setelah selesai
  } catch (error) {
    console.error('Failed to fetch or save locations:', error);
  }
}

fetchAndSaveLocations();
