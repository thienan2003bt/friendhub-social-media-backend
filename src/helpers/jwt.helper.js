require("dotenv").config();
const jwt = require("jsonwebtoken");

class JWTHelper {
    static generateToken(payload) {
        try {
            return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_IN });
        } catch (error) {
            console.error("JWT signing error: ", error.message);
            return null;
        }
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.error("JWT verification error: ", error.message);
            return null;
        }
    }
}

module.exports = JWTHelper;