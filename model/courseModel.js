const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    trim: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },

},
{
    timestamps: true,
}
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;