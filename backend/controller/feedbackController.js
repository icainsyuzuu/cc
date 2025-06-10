import { Feedback } from "../model/feedback.js";
import { User } from "../model/user.js"; // Import model User jika dibutuhkan

// Fungsi untuk mendapatkan feedback berdasarkan user_id
const getFeedbackByUserId = async (req, res) => {
    const { user_id } = req.params;

    try {
        const feedbacks = await Feedback.findAll({
            where: { user_id },
            include: [
                {
                    model: User,
                    as: "user", // Alias untuk model User
                    attributes: ["username", "email"], // Menampilkan informasi pengguna
                },
            ],
        });

        res.json({ status: "success", data: feedbacks });
    } catch (error) {
        console.error("Get feedback error:", error);
        res.status(500).json({ status: "failed", message: "Server error" });
    }
};

// Fungsi untuk membuat feedback baru
const createFeedback = async (req, res) => {
    const { message, rating, user_id } = req.body;

    try {
        // Validasi input
        if (!message || !rating || !user_id) {
            return res.status(400).json({ status: "failed", message: "Semua kolom harus diisi" });
        }

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User tidak ditemukan" });
        }


        const newFeedback = await Feedback.create({
            user_id,
            message,
            rating,
        });

        res.status(201).json({ status: "success", message: "Feedback berhasil dikirim", data: newFeedback });
    } catch (error) {
        console.error("Create feedback error:", error);
        res.status(500).json({ status: "failed", message: "Server error" });
    }
};

// Fungsi untuk memperbarui feedback berdasarkan ID
const updateFeedbackById = async (req, res) => {
    const { id } = req.params;
    const { message, rating } = req.body;

    try {
        const feedback = await Feedback.findByPk(id);
        if (!feedback) {
            return res.status(404).json({ status: "failed", message: "Feedback tidak ditemukan" });
        }

        await feedback.update({
            message,
            rating,
        });

        res.json({ status: "success", message: "Feedback berhasil diperbarui", data: feedback });
    } catch (error) {
        console.error("Update feedback error:", error);
        res.status(500).json({ status: "failed", message: "Server error" });
    }
};

// Fungsi untuk menghapus feedback berdasarkan ID
const deleteFeedbackById = async (req, res) => {
    const { id } = req.params;

    try {
        const feedback = await Feedback.findByPk(id);
        if (!feedback) {
            return res.status(404).json({ status: "failed", message: "Feedback tidak ditemukan" });
        }

        await feedback.destroy();

        res.json({ status: "success", message: "Feedback berhasil dihapus" });
    } catch (error) {
        console.error("Delete feedback error:", error);
        res.status(500).json({ status: "failed", message: "Server error" });
    }
};

export {
    getFeedbackByUserId,
    createFeedback,
    updateFeedbackById,
    deleteFeedbackById,
};