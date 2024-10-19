const { NotFoundError, BadRequestError } = require("../core/error.response");
const BcryptHelper = require("../helpers/bcrypt.helper");
const JWTHelper = require("../helpers/jwt.helper");
const SlugifyHelper = require("../helpers/slugify.helper");
const UserModel = require("../models/user.model");
const { UserDataMapper } = require("../utils/dataMapper.util");
const UserUtility = require('../utils/user.util');

class AccessService {
    async handleLogin(email, password) {
        const foundUser = await UserModel.findOne({user_email: email}).lean();
        if (!foundUser) {
            // Now showing "User not found", because then attackers can know if the user exists or not, which is a security risk
            throw new BadRequestError("Username or Password is incorrect!");
        }

        const isPasswordMatched = BcryptHelper.compare(password, foundUser?.user_password);
        if(isPasswordMatched === false) {
            throw new BadRequestError("Username or Password is incorrect!");
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
        // TODO: Handle logout logic here for session
        return {};
    }

    async handleSignup(email, fullname, password) {
        const select = UserUtility.filterUserAttributes("brief");
        const foundUser = await UserModel.findOne({ user_email: email }).select(select).lean();
        if(foundUser) {
            throw new BadRequestError("User already exists!");
        }

        const hashedPassword = BcryptHelper.hash(password);
        if(!hashedPassword) {
            throw new BadRequestError("Failed to hash password, please try again!");
        }

        const slug = SlugifyHelper.slugify(fullname);
        if(!slug) {
            throw new BadRequestError("Failed to generate slug, please try again!");
        }

        const newUser = await UserModel.create({
            user_slug: slug,
            user_email: email,
            user_fullname: fullname, 
            user_password: hashedPassword
        });
        if(!newUser || !newUser?._doc) {
            throw new BadRequestError("Failed to create user, please try again!");
        }

        const result = {
            ...UserDataMapper.mapObject(newUser._doc),
            password: undefined
        }
        return result;
    }
}

module.exports = new AccessService();