import { User } from '../model/user.js';

async function getDashboard(req, res) {
    try {
        const userId = req.user.userId; // didapat dari authMiddleware

        // Cari data user dari DB
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
        }

        // Contoh data notifikasi statis
        const notifications = [
            "Pengambilan sampah besok pagi",
            "Event bersih-bersih minggu ini",
            "Achievement baru: Green Hero!"
        ];

        return res.json({
            success: true,
            ecoPoints: user.eco_points,
            notifications
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        return res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
    }
}

async function getProfile(req, res) {
    try {
        const userId = req.user.userId; // Retrieved from authMiddleware

        // Fetch the user data from the DB
        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'profile_image', 'eco_points']
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                profile_image: user.profile_image || 'default-avatar.png', // Default avatar if none exists
                eco_points: user.eco_points,
            }
        });
    } catch (error) {
        console.error('Profile error:', error);
        return res.status(500).json({ success: false, message: 'Server error occurred' });
    }
}

export {
    getDashboard,
    getProfile
}