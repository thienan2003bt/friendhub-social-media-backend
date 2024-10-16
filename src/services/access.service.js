const { NotFoundError, BadRequestError } = require("../core/error.response");
const BcryptHelper = require("../helpers/bcrypt.helper");
const JWTHelper = require("../helpers/jwt.helper");
const UserModel = require("../models/user.model");
const { UserDataMapper } = require("../utils/dataMapper.util");

class AccessService {
    async handleLogin(email, password) {
        const foundUser = await UserModel.findOne({user_email: email}).lean();
        if(!foundUser) {
            throw new NotFoundError("User not found!");
        }

        const isPasswordMatched = BcryptHelper.compare(password, foundUser?.user_password);
        if(isPasswordMatched === false) {
            throw new BadRequestError("Password is incorrect!");
        }

        const mappedUser = { ...UserDataMapper.mapObject(foundUser), password: undefined};
        const accessToken = JWTHelper.generateToken(mappedUser);

        // TODO: Generate refresh token and save it to database
        // TODO: Add permissions to user
        return {
            user: mappedUser,
            accessToken,
            permissions: ['p-00000'], // dummy permissions
        }
    }

    async handleLogout() {
        
    }
}

module.exports = new AccessService();