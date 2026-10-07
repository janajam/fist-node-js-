const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      min: 0,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { 
    timestamps: true 

  },
);

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
