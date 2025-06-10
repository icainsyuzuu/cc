import { Feedback } from "../model/feedback.js";
import { User } from "../model/user.js";

// Fungsi untuk mendapatkan feedback berdasarkan user_id
const getFeedbackByUserId = async (req, res) => {
    const { user_id } = req.params;

    try {
        // Validate user_id
        if (!user_id) {
            return res.status(400).json({ 
                status: "failed", 
                message: "User ID diperlukan" 
            });
        }

        const feedbacks = await Feedback.findAll({
            where: { user_id },
            include: [
                {
                    model: User,
                    as: "user", // Alias untuk model User
                    attributes: ["username", "email"], // Menampilkan informasi pengguna
                },
            ],
            order: [['created_at', 'DESC']], // Order by newest first
        });

        res.json({ 
            status: "success", 
            data: feedbacks 
        });
    } catch (error) {
        console.error("Get feedback error:", error);
        res.status(500).json({ 
            status: "failed", 
            message: "Server error" 
        });
    }
};

const getFeedbacksById = async (req, res) => {
    const { id } = req.params;

    try {
        // Validate id
        if (!id) {
            return res.status(400).json({
                status: "failed",
                message: "Feedback ID diperlukan"
            });
        }

        const feedback = await Feedback.findByPk(id, {
            include: [{
                model: User,
                as: "user", // sesuai alias
                attributes: ["username", "email"],
            }],
        });

        if (!feedback) {
            return res.status(404).json({
                status: "failed",
                message: "Data tidak ditemukan"
            });
        }

        res.json({
            status: "success",
            data: feedback
        });
    } catch (error) {
        console.error("Get Feedback error:", error);
        res.status(500).json({
            status: "failed",
            message: "Server error"
        });
    }
};

// Fungsi untuk membuat feedback baru
const createFeedback = async (req, res) => {
    const { user_id } = req.params;  // user_id didapat dari parameter URL
    const { message, rating, type } = req.body;  // id dihapus, karena auto-increment

    // Validasi input
    if (!message || !rating || !user_id) {
        return res.status(400).json({ 
            status: "failed", 
            message: "Semua kolom harus diisi" 
        });
    }

    // Validasi rating range
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ 
            status: "failed", 
            message: "Rating harus antara 1-5" 
        });
    }

    try {
        // Cek jika user ada di database
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ 
                status: "failed", 
                message: "User tidak ditemukan" 
            });
        }

        // Simpan feedback ke dalam database
        const newFeedback = await Feedback.create({
            user_id,
            message,
            rating: parseInt(rating),
            type: type || "general", // Default type
        });

        // Get the created feedback with user data
        const feedbackWithUser = await Feedback.findByPk(newFeedback.id, {
            include: [{
                model: User,
                as: "user",
                attributes: ["username", "email"],
            }],
        });

        res.status(201).json({
            status: "success",
            message: "Feedback berhasil dikirim",
            data: feedbackWithUser,
        });
    } catch (error) {
        console.error("Create feedback error:", error);
        res.status(500).json({ 
            status: "failed", 
            message: "Server error" 
        });
    }
};

// Fungsi untuk memperbarui feedback berdasarkan ID
const updateFeedbackById = async (req, res) => {
    const { id } = req.params;
    const { message, rating } = req.body;

    try {
        // Validate input
        if (!id) {
            return res.status(400).json({
                status: "failed",
                message: "Feedback ID diperlukan"
            });
        }

        if (!message || !rating) {
            return res.status(400).json({
                status: "failed",
                message: "Message dan rating harus diisi"
            });
        }

        // Validasi rating range
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                status: "failed",
                message: "Rating harus antara 1-5"
            });
        }

        const feedback = await Feedback.findByPk(id);
        if (!feedback) {
            return res.status(404).json({ 
                status: "failed", 
                message: "Feedback tidak ditemukan" 
            });
        }

        await feedback.update({
            message,
            rating: parseInt(rating),
        });

        // Get updated feedback with user data
        const updatedFeedback = await Feedback.findByPk(id, {
            include: [{
                model: User,
                as: "user",
                attributes: ["username", "email"],
            }],
        });

        res.json({ 
            status: "success", 
            message: "Feedback berhasil diperbarui", 
            data: updatedFeedback 
        });
    } catch (error) {
        console.error("Update feedback error:", error);
        res.status(500).json({ 
            status: "failed", 
            message: "Server error" 
        });
    }
};

// Fungsi untuk menghapus feedback berdasarkan ID
const deleteFeedbackById = async (req, res) => {
    const { id } = req.params;

    try {
        // Validate input
        if (!id) {
            return res.status(400).json({
                status: "failed",
                message: "Feedback ID diperlukan"
            });
        }

        const feedback = await Feedback.findByPk(id);
        if (!feedback) {
            return res.status(404).json({ 
                status: "failed", 
                message: "Feedback tidak ditemukan" 
            });
        }

        await feedback.destroy();

        res.json({ 
            status: "success", 
            message: "Feedback berhasil dihapus" 
        });
    } catch (error) {
        console.error("Delete feedback error:", error);
        res.status(500).json({ 
            status: "failed", 
            message: "Server error" 
        });
    }
};

export {
    getFeedbackByUserId,
    getFeedbacksById,
    createFeedback,
    updateFeedbackById,
    deleteFeedbackById,
};
