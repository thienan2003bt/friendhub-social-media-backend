'use strict';
const bcrypt = require('bcrypt');
const SALT =bcrypt.genSaltSync(10);

class BcryptHelper {
    static hash(data) {
        return bcrypt.hashSync(data, SALT);
    }

    static compare(rawData, hashedData) {
        return bcrypt.compareSync(rawData, hashedData);
    }
}

module.exports = BcryptHelper;