const { BadRequestError } = require("../core/error.response");
const AccessValidator = require("../validators/access.validator");
const AccessService = require("../services/access.service");
const { OKSuccessResponse, CreatedSuccessResponse } = require("../core/success.response");

class AccessController {
    static async login(req, res, next) {
        const email = req.body?.email;
        const password = req.body?.password;

        const validation = AccessValidator.validateLogin(email, password);
        if(validation?.result === false) {
            throw new BadRequestError(validation?.message ?? '');
        }

        const data = await AccessService.handleLogin(email, password);
        res.cookie('accessToken', data?.accessToken, {
            httpOnly: true,
            sameSite: 'None', // None allows cross-origin cookies
            secure: true,     // Make sure you are using HTTPS
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days, JWT_EXPIRE_IN
        });
        return new OKSuccessResponse({
            message: "Login success!",
            metadata: data
        }).send(res);
    }
    
    static async logout(req, res, next) {
        // logout logic

        const data = await AccessService.handleLogout();
        return new OKSuccessResponse({
            message: "Logout success!",
            metadata: data
        }).send(res);
    }

    static async signup(req, res, next) {
        // signup logic
        const email = req.body?.email;
        const fullname = req.body?.fullname;
        const password = req.body?.password;

        const validation = AccessValidator.validateSignup(email, fullname, password);
        if(validation?.result === false) {
            throw new BadRequestError(validation?.message ?? '');
        }

        const data = await AccessService.handleSignup(email, fullname, password);

        console.log("Access token: ", data?.accessToken);
        res.cookie('accessToken', data?.accessToken, {
            httpOnly: true,
            sameSite: 'None', // None allows cross-origin cookies
            secure: true,     // Make sure you are using HTTPS
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days, JWT_EXPIRE_IN
        });

        return new CreatedSuccessResponse({
            message: "Signup success!",
            metadata: data
        }).send(res);
    }
}

module.exports = AccessController;