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
                profile_image: user.profile_image,
                eco_points: user.eco_points,
            }
        });
    } catch (error) {
        console.error('Profile error:', error);
        return res.status(500).json({ success: false, message: 'Server error occurred' });
    }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user.userId; // dari authMiddleware
    const { username, email } = req.body;

    // Ambil user saat ini
    const currentUser = await User.findByPk(userId);
    if (!currentUser) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    // Cek apakah email baru sudah digunakan oleh user lain
    if (email && email !== currentUser.email) {
      const existingEmailUser = await User.findOne({ where: { email } });
      if (existingEmailUser) {
        return res.status(409).json({ success: false, message: 'Email sudah digunakan oleh user lain' });
      }
    }

    // Update data
    await currentUser.update({ username, email });

    return res.json({
      success: true,
      message: 'Profil berhasil diperbarui',
      user: {
        id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        profile_image: currentUser.profile_image,
        eco_points: currentUser.eco_points
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
}


export {
    getDashboard,
    getProfile,
    updateProfile
}