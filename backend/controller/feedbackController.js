import { Feedback } from "../model/feedback.js";
import { User } from "../model/user.js";

// Fungsi untuk mendapatkan feedback berdasarkan user_id
const getFeedbackByUserId = async (req, res) => {
    const { user_id } = req.params;

    try {
        console.log('Getting feedback for user_id:', user_id);

        // Validate user_id
        if (!user_id) {
            return res.status(400).json({
                status: "failed",
                message: "User ID diperlukan"
            });
        }

        // Try to get feedbacks with user data
        let feedbacks;
        try {
            feedbacks = await Feedback.findAll({
                where: { user_id },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["username", "email"],
                        required: false // LEFT JOIN
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
        } catch (includeError) {
            console.error("Error with include, trying without:", includeError);
            // If association fails, get feedbacks without user data
            feedbacks = await Feedback.findAll({
                where: { user_id },
                order: [['createdAt', 'DESC']],
            });
        }

        console.log('Found feedbacks:', feedbacks.length);

        res.json({
            status: "success",
            data: feedbacks
        });
    } catch (error) {
        console.error("Get feedback error:", error);
        console.error("Error details:", error.message);
        console.error("Stack trace:", error.stack);
        res.status(500).json({
            status: "failed",
            message: "Server error: " + error.message
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

        let feedback;
        try {
            feedback = await Feedback.findByPk(id, {
                include: [{
                    model: User,
                    as: "user",
                    attributes: ["username", "email"],
                    required: false
                }],
            });
        } catch (includeError) {
            console.error("Error with include, trying without:", includeError);
            feedback = await Feedback.findByPk(id);
        }

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
            message: "Server error: " + error.message
        });
    }
};

// Fungsi untuk membuat feedback baru
const createFeedback = async (req, res) => {
    const { user_id } = req.params;
    const { message, rating } = req.body; // Removed 'type' since it's not in your model

    console.log('Creating feedback for user_id:', user_id);
    console.log('Request body:', req.body);

    // Validasi input
    if (!message || !rating || !user_id) {
        return res.status(400).json({
            status: "failed",
            message: "Semua kolom harus diisi"
        });
    }

    // Validasi rating range
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({
            status: "failed",
            message: "Rating harus antara 1-5"
        });
    }

    try {
        // Check if user exists (optional, remove if you don't want to validate)
        try {
            const user = await User.findByPk(user_id);
            if (!user) {
                console.log('User not found, but continuing anyway');
            }
        } catch (userError) {
            console.log('Cannot check user existence, continuing anyway:', userError.message);
        }

        // Create feedback without type field
        const newFeedback = await Feedback.create({
            user_id: parseInt(user_id),
            message,
            rating: ratingNum,
        });

        console.log('Feedback created:', newFeedback.toJSON());

        res.status(201).json({
            status: "success",
            message: "Feedback berhasil dikirim",
            data: newFeedback,
        });
    } catch (error) {
        console.error("Create feedback error:", error);
        console.error("Error details:", error.message);
        res.status(500).json({
            status: "failed",
            message: "Server error: " + error.message
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
        const ratingNum = parseInt(rating);
        if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
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
            rating: ratingNum,
        });

        res.json({
            status: "success",
            message: "Feedback berhasil diperbarui",
            data: feedback
        });
    } catch (error) {
        console.error("Update feedback error:", error);
        res.status(500).json({
            status: "failed",
            message: "Server error: " + error.message
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
            message: "Server error: " + error.message
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
