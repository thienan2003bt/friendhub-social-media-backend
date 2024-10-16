'use strict';

class ValidatorConfig {
    constructor(model) {
        this.model = model;
    }

    static generateReturningValue(isPassed, errorMessage) {
        return {
            result: isPassed,
            message: (isPassed === true) ? '' : errorMessage,
        };
    }
}

module.exports = ValidatorConfig;