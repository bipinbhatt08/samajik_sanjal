const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
exports.isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'Access denied. Please log in.' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userExists = await User.findOne({email:decoded.email})
      if(!userExists){
        return res.status(404).json({
            message : "User doesn't exists with that token/id"
        })
       }
      req.user = userExists; // Attach user info to request
      next(); // Proceed
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired token.' });
    }
  };
  