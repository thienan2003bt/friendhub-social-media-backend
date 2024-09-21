'use strict';

const userService = require("../services/user.service");
const {OKSuccessResponse, CreatedSuccessResponse} = require('../core/success.response');
const UserValidator = require("../validators/user.validator");


class UserController {
    static async findAllUsers(req, res, next) {
        const page = req.query?.page;
        const limit = req.query?.limit;
        const scope = req.query?.scope;
        const validation = UserValidator.validateFindingAllUsers(page, limit, scope);
        if(validation?.result === false) {
            throw new Error(validation?.message ?? '');
        }

        const data = await userService.findAllUsers(page, limit, scope);
        return new OKSuccessResponse({
            message: 'Find all users successfully!',
            metadata: data,
        }).send(res);
    }

    static async findUserById(req, res, next) {
        const user_id = req.params?.user_id;
        const validation = UserValidator.validateFindingUserById(user_id);
        if(validation?.result === false) {
            throw new Error(validation?.message ?? '');
        }

        const data = await userService.findUserById(user_id);
        return new OKSuccessResponse({
            message: 'Find user by id successfully!',
            metadata: data,
        }).send(res);
    }

    static async createNewUser(req, res, next) {
        const newUser = req.body;
        const validation = UserValidator.validateCreatingNewUser(newUser);
        if(validation?.result === false) {
            throw new Error(validation?.message ?? '');
        }

        const data = await userService.createNewUser(newUser);
        return new CreatedSuccessResponse({
            message: 'Create new user successfully!',
            metadata: data,
        }).send(res);
    }

    static async updateUser(req, res, next) {
        const user_id = req.params?.user_id;
        const updatedUser = req.body;
        const validation = UserValidator.validateUpdatingUser(user_id, updatedUser);
        if(validation?.result === false) {
            throw new Error(validation?.message ?? '');
        }

        const data = await userService.updateUser(user_id, updatedUser);
        return new OKSuccessResponse({
            message: 'Update user successfully!',
            metadata: data,
        }).send(res);
    }

    static async deleteUser(req, res, next) {
        const user_id = req.params?.user_id;
        const validation = UserValidator.validateDeletingUser(user_id);
        if(validation?.result === false) {
            throw new Error(validation?.message ?? '');
        }

        const data = await userService.deleteUser(user_id);
        return new OKSuccessResponse({
            message: 'Delete user successfully!',
            metadata: data,
        }).send(res);
    }
}

module.exports = UserController;