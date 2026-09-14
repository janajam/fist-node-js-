const { body } = require("express-validator");

exports.registerValidator = [
  body("name").trim().notEmpty().withMessage("name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("pleas enter valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters "),
];