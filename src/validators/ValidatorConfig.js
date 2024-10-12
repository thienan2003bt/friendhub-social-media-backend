'use strict';

class ValidatorConfig {
    constructor(model) {
        this.model = model;
    }

    static generateReturningValue(result, errorMessage) {
        return {
            result: result,
            message: (result === true) ? '' : errorMessage,
        };
    }
}

module.exports = ValidatorConfig;