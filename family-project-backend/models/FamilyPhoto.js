const mongoose = require("mongoose");

const FamilyPhotoSchema = new mongoose.Schema({
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FamilyPhoto", FamilyPhotoSchema);
