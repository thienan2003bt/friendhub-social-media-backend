'use strict';

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    user_status: {type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'INACTIVE'},
    user_email: {type: String, required: true},
    user_password: {type: String, required: true},
    user_fullname: {type: String, default: '', trim: true, maxLength: 150},
    user_avatar: {type: String, default: 'https://res.cloudinary.com/thienan-shopdev/image/upload/v1725609622/samples/logo.png'},
    user_address: {type: String, default: ''},
    user_phone: {type: String, default: ''},
    user_country: {type: String, default: 'VN'}
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);