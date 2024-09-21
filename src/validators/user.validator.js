'use strict';
const UserScopeHelper = require('../helpers/userScope.helper');
const ValidatorConfig = require('./ValidatorConfig');


class UserValidator extends ValidatorConfig {
    constructor() {
        super('UserValidator');
    }

    static validateUserId(user_id) {
        if(!user_id) {
            return this.generateReturningValue(false, `User's id is required!`);
        }

        return this.generateReturningValue(true, '');
    }

    static validateScope(scope) {
        if(UserScopeHelper.isValidScope(scope) === false) {
            return this.generateReturningValue(false, 'Invalid scope!');
        }

        return this.generateReturningValue(true, '');
    }



    static validateFindingAllUsers(page, limit, scope) {        
        if(+page < 1 || +limit < 1) {
            return this.generateReturningValue(false, 'Invalid query of page or limit, must be a number greater than or equal to 1!');
        }

        return this.validateScope(scope);
    }

    static validateFindingUserById(user_id) {
        return this.validateUserId(user_id);
    }

    static validateCreatingNewUser(newUser) {
        if(!newUser.email || !newUser.password) {
            return this.generateReturningValue(false, 'Email and password are required!');
        }

        return this.generateReturningValue(true, '');
    }

    static validateUpdatingUser(user_id, updatedUser) {
        if(updatedUser.password) {
            return this.generateReturningValue(false, 'Cannot change password in this route, please try another endpoint!');
        }

        return this.validateUserId(user_id);

    }

    static validateDeletingUser(user_id) {
        return this.validateUserId(user_id);
    }
}

module.exports = UserValidator;