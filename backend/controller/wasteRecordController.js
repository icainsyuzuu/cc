import { WasteRecord } from '../model/waste_record.js';

async function logWaste(req, res) {
    try {
        const userId = req.user.userId;
        const { type, weight, description } = req.body;

        // Validasi input
        if (!type || !weight) {
            return res.status(400).json({
                success: false,
                message: 'Tipe sampah dan berat harus diisi'
            });
        }

        // TODO: Simpan ke database setelah model WasteRecord dibuat
        // Untuk sementara hanya return success

        return res.status(201).json({
            success: true,
            message: 'Data sampah berhasil dicatat',
            data: {
                type,
                weight,
                description: description || '',
                userId,
                points_earned: Math.floor(weight * 10) // 10 poin per kg
            }
        });
    } catch (error) {
        console.error('Log waste error:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
}

async function getWasteHistory(req, res) {
    try {
        const userId = req.user.userId;

        // TODO: Ambil dari database setelah model WasteRecord dibuat
        // Untuk sementara return data dummy
        const dummyHistory = [
            {
                id: 1,
                type: 'Plastik',
                weight: 2.5,
                description: 'Botol plastik bekas',
                points_earned: 25,
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                type: 'Kertas',
                weight: 1.0,
                description: 'Kertas bekas',
                points_earned: 10,
                created_at: new Date(Date.now() - 86400000).toISOString() // 1 hari lalu
            }
        ];

        return res.json({
            success: true,
            data: dummyHistory
        });
    } catch (error) {
        console.error('Get waste history error:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
}

export {
    getWasteHistory,
    logWaste
}