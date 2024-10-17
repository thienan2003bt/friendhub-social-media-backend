const ValidatorConfig = require('./ValidatorConfig');

class AccessValidator extends ValidatorConfig {
    constructor() {
        super('UserValidator');
    }

    static validateLogin(email, password) {
        if(!email || !password) {
            return this.generateReturningValue(false, 'Email and password are required');
        }
        return { result: true };
    }

    static validateSignup(email, fullname, password) {
        if(!email || !fullname || !password) {
            return this.generateReturningValue(false, 'Email, fullname, and password are required');
        }
        return { result: true };
    }
}

module.exports = AccessValidator;