import { WasteRecord } from "../model/wasteRecord.js";
import { User } from "../model/user.js";
import { Location } from "../model/location.js";
import { Waste } from "../model/waste.js";
import { bucket } from "../config/gcs.js"; // Jangan lupa pastikan bucket diimport kalau pakai GCS

const getWasteRecordsByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const records = await WasteRecord.findAll({
      where: { user_id },
      include: [
        {
          model: User,
          as: "user", // sesuai alias
          attributes: ["username", "email", "eco_points"],
        },
        {
          model: Waste,
          as: "waste", // sesuai alias
          attributes: ["type", "price", "eco_points"],
        },
        {
          model: Location,
          as: "location", // sesuai alias
          attributes: ["name", "city", "province"],
        },
      ],
    });

    res.json({ status: "success", data: records });
  } catch (error) {
    console.error("Get waste records error:", error);
    res.status(500).json({ status: "failed", message: "Server error" });
  }
};

const getWasteRecordsById = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const record = await WasteRecord.findByPk(id, { // Find by primary key (id)
      include: [{
        model: User,
        as: "user", // sesuai alias
        attributes: ["username", "email", "eco_points"],
      },
      {
        model: Waste,
        as: "waste", // sesuai alias
        attributes: ["type", "price", "eco_points"],
      }, {
        model: Location,
        as: "location", // sesuai alias
        attributes: ["name", "city", "province"],
      },
      ],
    });

    if (!record) {
      return res.status(404).json({
        status: "failed",
        message: "Data tidak ditemukan"
      }); // Handle not found
    }

    res.json({
      status: "success",
      data: record
    });
  } catch (error) {
    console.error("Get waste records error:", error);
    res.status(500).json({
      status: "failed",
      message: "Server error"
    });
  }
};

const createWasteRecordByUserId = async (req, res) => {
  const { user_id } = req.params;
  const { location_id, waste_id, weight, date_collected } = req.body;

  if (!req.file) {
    return res.status(400).json({ status: "failed", message: "Image file is required" });
  }

  try {
    const user = await User.findByPk(user_id);
    const waste = await Waste.findByPk(waste_id);
    if (!user || !waste) {
      return res.status(404).json({ status: "failed", message: "User atau Waste tidak ditemukan" });
    }

    const earnedPoints = waste.eco_points * weight;

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

      const newRecord = await WasteRecord.create({
        user_id,
        location_id,
        waste_id,
        weight,
        date_collected,
        image_url: publicUrl,
      });

      // Update eco_points user
      await user.update({ eco_points: user.eco_points + earnedPoints });

      res.status(201).json({ status: "success", message: "Data berhasil dibuat", data: newRecord });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Create record error:", error);
    res.status(500).json({ status: "failed", message: "Server error" });
  }
};

const updateWasteRecordById = async (req, res) => {
  const { id } = req.params;
  const { location_id, waste_id, weight, date_collected } = req.body;

  try {
    const record = await WasteRecord.findByPk(id);
    if (!record) {
      return res.status(404).json({ status: "failed", message: "Data tidak ditemukan" });
    }

    const user = await User.findByPk(record.user_id);
    const oldWaste = await Waste.findByPk(record.waste_id);
    const newWaste = await Waste.findByPk(waste_id);

    if (!user || !oldWaste || !newWaste) {
      return res.status(404).json({ status: "failed", message: "Data user atau waste tidak ditemukan" });
    }

    // Kurangi eco_points lama
    const previousPoints = record.weight * oldWaste.eco_points;
    // Tambah eco_points baru
    const newPoints = weight * newWaste.eco_points;
    const updatedEcoPoints = user.eco_points - previousPoints + newPoints;

    await record.update({ location_id, waste_id, weight, date_collected });
    await user.update({ eco_points: updatedEcoPoints });

    res.json({ status: "success", message: "Data berhasil diperbarui", data: record });
  } catch (error) {
    console.error("Update record error:", error);
    res.status(500).json({ status: "failed", message: "Server error" });
  }
};

const deleteWasteRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await WasteRecord.findByPk(id);
    if (!record) {
      return res.status(404).json({ status: "failed", message: "Data tidak ditemukan" });
    }

    const user = await User.findByPk(record.user_id);
    const waste = await Waste.findByPk(record.waste_id);

    if (user && waste) {
      const lostPoints = record.weight * waste.eco_points;
      await user.update({ eco_points: user.eco_points - lostPoints });
    }

    await record.destroy();

    res.json({ status: "success", message: "Data berhasil dihapus" });
  } catch (error) {
    console.error("Delete record error:", error);
    res.status(500).json({ status: "failed", message: "Server error" });
  }
};

export {
  getWasteRecordsByUserId,
  updateWasteRecordById,
  deleteWasteRecordById,
  createWasteRecordByUserId,
  getWasteRecordsById
};
