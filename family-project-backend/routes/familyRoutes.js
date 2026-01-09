const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const FamilyPhoto = require("../models/FamilyPhoto");

// GET all family photos
router.get("/", async (req, res) => {
  try {
    const photos = await FamilyPhoto.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD family photo (Cloudinary)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const photo = new FamilyPhoto({
      imageUrl: req.file.path, // Cloudinary URL
    });

    await photo.save();
    res.json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE family photo
router.delete("/:id", async (req, res) => {
  try {
    await FamilyPhoto.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
