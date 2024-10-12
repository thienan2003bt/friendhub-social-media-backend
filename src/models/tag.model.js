const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const tagSchema = new mongoose.Schema({
    tag_slug: {type: String, required: true,},
    tag_name: {type: String, required: true},
    tag_description: {type: String, default: ''},
}, {
    timestamps: true,
    collection: "Tags",
});

//Export the model
module.exports = mongoose.model('Tag', tagSchema);