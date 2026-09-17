const { body } = require("express-validator");

exports.registerValidator = [
  body("name").trim().notEmpty().withMessage("name is required"),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("pleas enter valid email")
    .bail()
    .custom(async (email) => {
      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Error("user already exists");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    // .isLength({ min: 6 })
    // .withMessage("password must be at least 6 characters ")
    .isStrongPassword({
      minlength: 6,
      minlowercase: 1,
      minuppercase: 1,
      minnumbers: 1,
      minsymbols: 1,
    })
    .withMessage(
      "password mustbe at least 6 characters and contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
    )
    .custom((value, { req }) => {
      if (value === "123456" || value === "password") {
        throw new Error("passwords is not strong enough");
      }
      return true;
    }),
  body("confirmPassword")
    .notEmpty()
      .withMessage("confirm password is required")
  .bail()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters ")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("passwords do not match");
      }
      return true;
    }),
];

exports.loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("pleas enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters "),
];
