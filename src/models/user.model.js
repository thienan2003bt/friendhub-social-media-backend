'use strict';

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    user_slug: {type: String, default: ''},
    user_email: {type: String, required: true},
    user_password: {type: String, required: true},
    user_status: {type: String, enum: ['ACTIVE', 'INACTIVE', 'BLOCKED', 'VERIFIED', 'GOVERNMENT'], default: 'INACTIVE'},
    user_fullname: {type: String, default: '', trim: true, maxLength: 150},
    user_address: {type: String, default: ''},
    user_phone: {type: String, default: ''},
    user_country: {type: String, default: 'VN'},
    user_avatar: {type: String, default: ''},
    user_friends: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    user_profileId: {type: mongoose.Types.ObjectId, ref: 'Profile'},
    user_favorite_tags: [{
        score: {type: Number, default: 0},
        tagId: {type: mongoose.Types.ObjectId, ref: "Tag"}
    }]
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);