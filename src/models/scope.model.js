const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const scopeSchema = new mongoose.Schema({
    scope_resource: {type: String, default: 'POST', enum: ['POST', 'STORY', 'STREAM']},
    scope_name: {type: String, required: true, enum: ['PUBLIC', 'FRIENDS', 'FRIENDS_EXCEPT', 'SPECIFIC_FRIENDS', 'ONLY_ME']},
    scope_description: {type: String, default: ''},
    scope_permissions: [{
        userId: {type: mongoose.Types.ObjectId, ref: "User"},
        canSee: {type: Boolean, default: true},
    }],
}, {
    timestamps: true,
    collection: "Scopes"
});

//Export the model
module.exports = mongoose.model('Scope', scopeSchema);