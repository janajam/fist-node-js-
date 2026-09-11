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

exports.authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
    next();
  };
};

exports.checkOwnership = async (req, res, next) => {
  
    const { id } = req.params;
    if (req.user.id === id || req.user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({
          message:
            "Access denied. You do not have permission to perform this action.",
        });
    }
  
};




exports.verifyRefreshToken =  (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;


    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }
    

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    req.user = decoded;
    req.refreshToken = refreshToken;
    
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
