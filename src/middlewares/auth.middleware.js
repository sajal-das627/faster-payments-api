// src/middlewares/auth.middleware.js (Auth Middleware)
exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.token = token.split(" ")[1];
    next();
  };
  