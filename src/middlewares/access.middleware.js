const { AuthFailureError } = require("../core/error.response");
const JWTHelper = require("../helpers/jwt.helper");

class AccessMiddleware {
    static async checkAuthentication(req, res, next) {
        const accessToken = req.headers['authorization'].replace('Bearer ', '');
        if (!accessToken) {
            return new AuthFailureError("Access Denied");
        }
        
        const decoded = JWTHelper.verifyToken(accessToken);
        if(!decoded || !decoded?._id) {
            return new AuthFailureError("Access Denied");
        } 

        req.user = decoded;

        return next();
    }
}

module.exports = AccessMiddleware;