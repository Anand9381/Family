const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const EventPhoto = require("../models/EventPhoto");

/**
 * ✅ GET ALL EVENT PHOTOS
 * URL: /api/events
 */
router.get("/", async (req, res) => {
  try {
    const photos = await EventPhoto.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ ADD EVENT PHOTO (Cloudinary)
 * URL: /api/events/add
 */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const photo = await EventPhoto.create({
      imageUrl: req.file.path,
    });

    return res.status(201).json(photo);
  } catch (err) {
    console.error("EVENT UPLOAD ERROR:", err);

    // 🔴 FORCE JSON RESPONSE
    return res.status(500).json({
      error: err.message || "Event upload failed",
    });
  }
});






/**
 * ✅ DELETE EVENT PHOTO
 * URL: /api/events/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    await EventPhoto.findByIdAndDelete(req.params.id);
    res.json({ message: "Event photo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
