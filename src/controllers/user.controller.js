'use strict';

const userService = require("../services/user.service");
const {OKSuccessResponse, CreatedSuccessResponse} = require('../core/success.response');


class UserController {
    static async findAllUsers(req, res, next) {
        const data = await userService.findAllUsers({...req.query});
        return new OKSuccessResponse({
            message: 'Find all users successfully!',
            metadata: data,
        }).send(res);
    }

    static async createNewUser(req, res, next) {
        const data = await userService.createNewUser(req.body);
        return new OKSuccessResponse({
            message: 'Create new user successfully!',
            metadata: data,
        }).send(res);
    }
}

module.exports = UserController;