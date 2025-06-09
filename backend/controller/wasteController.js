import { Waste } from '../model/waste.js';

const getAllWastes = async (req, res) => {
    try {
        const wastes = await Waste.findAll();

        res.status(200).json({
            success: true,
            data: wastes,
        });
    } catch (error) {
        console.error('Get all wastes error:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data jenis sampah',
        });
    }
};

export { getAllWastes };
