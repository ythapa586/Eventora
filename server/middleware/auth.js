const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect Route
const protect = async (req, res, next) => {
    try {
        let token = null;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                message: 'Not authorized, no token'
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        next();
    } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
        message: 'Not authorized, token failed'
    });
}
};

// Admin Middleware
const admin = (req, res, next) => {
    console.log("USER =", req.user);

    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            message: 'Forbidden, admin access required'
        });
    }
};

module.exports = { protect, admin };