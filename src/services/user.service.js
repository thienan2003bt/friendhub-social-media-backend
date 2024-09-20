'use strict';
const userModel = require('../models/user.model');
const {BadRequestError, NotFoundError} = require('../core/error.response');
const BcryptHelper = require('../helpers/bcrypt.helper');
const normalizeUser = require('../utils/normalizeUser');

class UserService {
    findAllUsers = async (page = 1, limit = 50) => {
        const skip = +limit * (+page - 1);
        return userModel.find({}).sort({updatedAt: -1}).skip(skip).limit(limit).lean();
    }

    createNewUser = async (newUser) => {
        const foundUser = await userModel.findOne({
            where: {user_email: newUser?.email ?? ''}
        })
        if(foundUser) {
            throw new BadRequestError("User with this email is already in use, please try another one!");
        }

        const hashedPassword = BcryptHelper.hash(newUser?.password);
        return await userModel.create({
            ...normalizeUser(newUser),
            user_id: crypto.randomUUID(),
            user_password: hashedPassword,
        });
    }
}


module.exports = new UserService();