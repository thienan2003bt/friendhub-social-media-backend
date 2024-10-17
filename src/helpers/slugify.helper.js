const slugify = require('slugify');

class SlugifyHelper {
    static slugify(text) {
        return slugify(text, {
            lower: true,
        })
    }
}

module.exports = SlugifyHelper;