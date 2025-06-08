const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',    // sesuaikan host
      user: 'root',         // sesuaikan user
      password: '',         // sesuaikan password
      database: 'ecowaste' // sesuaikan nama database
    });
    console.log('Koneksi ke MySQL berhasil!');
    await connection.end();
  } catch (error) {
    console.error('Gagal koneksi ke MySQL:', error.message);
  }
}

testConnection();
