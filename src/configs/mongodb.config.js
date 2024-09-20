'use strict';
require('dotenv').config();

const mongodbConfig = {
    app: {
        port: process.env.DEV_PORT || 8081
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'bookshop'
    }
}

module.exports = mongodbConfig;