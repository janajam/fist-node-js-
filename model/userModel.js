const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//       select: false,
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "admin",
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// const User = mongoose.model("User", userSchema);
// module.exports = User;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[\p{L}\s]+$/u.test(value);
        },
        message: "Name can only contain letters and spaces",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function(value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "admin", "instructor"],
      default: "student",
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("User", userSchema);
module.exports = User;
