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

async function deleteProfile(req, res) {
  try {
    const userId = req.user.userId;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ success: false, message: "User tidak ditemukan" });

    await user.destroy();
    res.json({ success: true, message: "Akun berhasil dihapus" });
  } catch (err) {
    console.error("Delete profile error:", err);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
}

const uploadPhotoProfile = async (req, res) => {
  const { user_id } = req.params;

  if (!req.file) {
    return res.status(400).json({ status: "failed", message: "Image file is required" });
  }

  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ status: "failed", message: "User tidak ditemukan" });
    }

    const blob = bucket.file(`waste-images/${Date.now()}_${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: req.file.mimetype,
      predefinedAcl: "publicRead",
    });

    blobStream.on("error", (err) => {
      console.error("Upload error:", err);
      res.status(500).json({ status: "failed", message: "Failed to upload image" });
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const newPhoto = await User.update({
        profile_image: publicUrl,
      });

      res.status(201).json({ status: "success", message: "Data berhasil dibuat", data: newPhoto });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Create record error:", error);
    res.status(500).json({ status: "failed", message: "Server error" });
  }
};


export {
    getDashboard,
    getProfile,
    updateProfile,
    deleteProfile,
    uploadPhotoProfile
}