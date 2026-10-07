exports.sanitizeMongoInput = (req, res, next) => {
  const sanitizeObject = (obj) => {
    for (const key in obj) {

      // Reject MongoDB operators
      if (key.startsWith("$")) {
        return false;
      }

      // Reject dot notation
      if (key.includes(".")) {
        return false;
      }

      // Check nested objects recursively
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (!sanitizeObject(obj[key])) {
          return false;
        }
      }
    }

    return true;
  };

  if (!sanitizeObject(req.body)) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }

  next();
};