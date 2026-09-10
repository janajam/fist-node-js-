const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

exports.authAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }

  next();
};
