const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const postSchema = new mongoose.Schema({
    post_slug: {type: String, default: ''},
    post_title: {type: String, required: true},
    post_images: [{type: String, default: ''}],
    post_link: {type: String, default: ''},
    post_shareId: {type: mongoose.Types.ObjectId, ref: 'Post'},
    post_reacts: [{
        type: {type: String, default: 'LIKE', enum: ['LIKE', 'LOVE', 'HAHA', 'SAD', 'WOW', 'ANGRY']},
        user: {type: mongoose.Types.ObjectId, ref: 'User'}
    }],
    post_comments: [{type: mongoose.Types.ObjectId, ref: 'Comment'}],
    post_shares: [{
        user: {type: mongoose.Types.ObjectId, ref: 'User'},
        sharedPostId:{type: mongoose.Types.ObjectId, ref: 'Post'},
    }],
    post_scope: {type: mongoose.Types.ObjectId, ref: 'Scope'},
}, {
    timestamps: true,
    collection: 'Posts',
});

//Export the model
module.exports = mongoose.model('Post', postSchema);