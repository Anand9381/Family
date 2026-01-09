const mongoose = require("mongoose");

const EventPhotoSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 🔴 VERY IMPORTANT: prevent model overwrite error
module.exports =
  mongoose.models.EventPhoto ||
  mongoose.model("EventPhoto", EventPhotoSchema);
