'use strict';
const mongoose = require('mongoose');
const { db: { host, name, port } } = require('../configs/mongodb.config');
const connectString = `mongodb://${host}:${port}/${name}`;
const MAX_POOL_SIZE = 50;

class MongoDBDatabase {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(connectString, { maxPoolSize: MAX_POOL_SIZE })
                .then(_ => {
                    console.log("Connect to MongoDB successfully");
                })
                .catch(err => console.log("Error connecting to MongoDB: " + err))
    }

    static getInstance() {
        if (!MongoDBDatabase.instance) {
            MongoDBDatabase.instance = new MongoDBDatabase();
        }

        return MongoDBDatabase.instance;
    }
}


const instanceMongoDB = MongoDBDatabase.getInstance();

module.exports = instanceMongoDB;