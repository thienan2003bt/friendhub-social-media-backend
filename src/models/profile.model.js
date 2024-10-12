const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const profileSchema = new mongoose.Schema({
    profile_owner: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    profile_slug: {type: String, required: true},
    profile_avatars: [{type: String, default: ''}],
    profile_cover_photos: [{type: String, default: ''}],
    profile_photos: [{
        url: {type: String, default: ''},
        slug: {type: String, default: ''},
    }],
    profile_bio: {type: String, default: ''},
}, {
    timestamps: true,
    collection: 'Profiles',
});


const contactProfileSchema = new mongoose.Schema({
    c_profile_dob: {type: Date, default: new Date()},
    c_profile_user: {type: mongoose.Types.ObjectId, ref: 'User'},
    c_profile_pronoun: {type: String, default: 'HE', enum: ['HIM', 'HER', 'THEM']},
    c_profile_webs: [{type: String, default: ''}], // maxSize = 5
    c_profile_phones: [{type: String, default: ''}],
    c_profile_emails: [{type: String, default: ''}],
    c_profile_languages: [{type: String, default: 'US'}],
}, {
    timestamps: true,
    collection: 'ContactProfiles',
});
const overviewProfileSchema = new mongoose.Schema({
    o_profile_workplaces: [{type: String, default: ''}],
    o_profile_schools: [{type: String, default: ''}],
    o_profile_cities: [{type: String, default: ''}],
    o_profile_hometowns: [{type: String, default: ''}],
    o_profile_marital_status:{ 
        status: {type: String, default: 'Single', enum: ['Single', 'Married', 'In relationship', 'Engaged', 'Divorced', 'Complicated']},
        partner: {type: String, default: ''},
        partnerSlug: {type:String, default: ""},
        sinceYear: {type: Date, default: new Date()},
    },
    o_profile_phone: {type: String, default: ''},
}, {
    timestamps: true,
    collection: 'OverviewProfiles',
});
const workProfileSchema = new mongoose.Schema({
    w_profile_workplaces: [{type: String, default: ''}],
    w_profile_colleges: [{type: String, default: ''}],
    w_profile_high_schools: [{type: String, default: ''}],
}, {
    timestamps: true,
    collection: 'WorkProfiles',
});
const placeProfileSchema = new mongoose.Schema({
    p_profile_slug: {type: String, required: true},
    p_profile_current_cities: [{type: String, default: ''}],
    p_profile_hometowns: [{type: String, default: ''}],
}, {
    timestamps: true,
    collection: 'PlacesProfiles',
});
const relationshipProfileSchema = new mongoose.Schema({
    r_profile_current_cities: [{type: String, default: ''}],
    r_profile_hometowns: [{type: String, default: ''}],
}, {
    timestamps: true,
    collection: 'RelationshipProfiles',
});
const aboutProfileSchema = new mongoose.Schema({
    a_profile_details: {type: String, default: ''},
    a_profile_first_name: {type: String, default: ''},
    a_profile_last_name: {type: String, default: ''},
    a_profile_nicknames: [{type: String, default: ''}],
    a_profile_quotes: [{type: String, default: ''}],
}, {
    timestamps: true,
    collection: 'AboutProfiles',
});
const eventProfileSchema = new mongoose.Schema({
    e_profile_events: [{type: String, default: ''}],
}, {
    timestamps: true,
    collection: 'EventProfiles',
});



//Export the model
module.exports = {
    ProfileModel: mongoose.model('Profile', profileSchema),

    ContactProfileModel: mongoose.model('ContactProfile', contactProfileSchema),
    OverviewProfileModel: mongoose.model('OverviewProfile', overviewProfileSchema),
    WorkProfileModel: mongoose.model('WorkProfile', workProfileSchema),
    PlaceProfileModel: mongoose.model('PlaceProfile', placeProfileSchema),
    RelationshipProfileModel: mongoose.model('RelationshipProfile', relationshipProfileSchema),
    AboutProfileModel: mongoose.model('AboutProfile', aboutProfileSchema),
    EventProfileModel: mongoose.model('EventProfile', eventProfileSchema),
};