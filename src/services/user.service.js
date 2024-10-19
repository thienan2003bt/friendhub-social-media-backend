'use strict';
const userModel = require('../models/user.model');
const {BadRequestError, NotFoundError} = require('../core/error.response');
const BcryptHelper = require('../helpers/bcrypt.helper');
const UserUtility = require('../utils/user.util');
const { UserDataMapper } = require('../utils/dataMapper.util');

class UserService {
    findAllUsers = async (page = 1, limit = 50, scope = 'brief') => {
        const skip = +limit * (+page - 1);
        const select = UserUtility.filterUserAttributes(scope);

        let data = userModel.find({}).sort({updatedAt: -1}).skip(skip).limit(limit).select(select).lean();
        return data;
    }

    findUserById = async (user_id, scope = 'detail') => {
        const userId = UserUtility.convertToMongooseObjectIdType(user_id);
        const select = UserUtility.filterUserAttributes(scope);
        const foundUser = await userModel.findById(userId).select(select);
        if(!foundUser) {
            throw new NotFoundError('User not found!');
        }

        return foundUser;
    }

    createNewUser = async (newUser, scope = 'detail') => {
        const foundUser = await userModel.findOne({
            where: {user_email: newUser?.email ?? ''}
        })
        if(foundUser) {
            throw new BadRequestError("User with this email is already in use, please try another one!");
        }


        const hashedPassword = BcryptHelper.hash(newUser?.password);
        const select = UserUtility.filterUserAttributes(scope);

        return await userModel.create({
            ...UserDataMapper.mapBackObject(newUser),
            user_slug: crypto.randomUUID(),
            user_password: hashedPassword,
        });

    }

    updateUser = async (user_id, updatedUser, scope = 'detail') => {
        const foundUser = await userModel.findById(user_id);
        if(!foundUser) {
            throw new NotFoundError('User not found!');
        }

        const select = UserUtility.filterUserAttributes(scope);

        return await userModel.findByIdAndUpdate(user_id,
            { ...UserUtility.normalizeUser(updatedUser) }, 
            { new: true }
        ).select(select);
    }

    deleteUser = async (user_id) => {
        const foundUser = await userModel.findById(user_id);
        if(!foundUser) {
            throw new NotFoundError('User not found!');
        }

        return await foundUser.deleteOne();
    }
}


module.exports = new UserService();