class Mapper {
    constructor(prefix) {
        this.prefix = prefix;
    }

    map(attribute) {
        return attribute.replace(this.prefix, '');
    }

    mapBack(attribute) {
        return this.prefix + attribute;
    }

    mapArray(attributes) {
        return attributes.map(attribute => this.map(attribute));
    }

    mapBackArray(attributes) {
        return attributes.map(attribute => this.mapBack(attribute));
    }

    mapObject(object) {
        const mappedObject = {};
        for(const key in object) {
            mappedObject[this.map(key)] = object[key];
        }
        return mappedObject;
    }

    mapBackObject(object) {
        const mappedObject = {};
        for(const key in object) {
            mappedObject[this.mapBack(key)] = object[key];
        }
        return mappedObject;
    }
}

module.exports = {
    Mapper,
    UserDataMapper: new Mapper("user_"),
}