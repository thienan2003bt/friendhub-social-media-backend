'use strict';
const { Types } = require("mongoose");

class UserUtility {
    static convertToMongooseObjectIdType(id) {
        return new Types.ObjectId(id);
    }

    static normalizeUser(userData) {
        return {
            user_public_id: userData?.public_id,
            user_email: userData?.email,
            user_password: userData?.password,
            user_fullname: userData?.fullname,
            user_avatar: userData?.avatar,
            user_address: userData?.address,
            user_phone: userData?.phone,
            user_country: userData?.country
        }
    }

    static destabilizeUser(userData) {
        return {
            public_id: userData?.user_public_id,
            email: userData?.user_email,
            password: userData?.user_password,
            fullname: userData?.user_fullname,
            avatar: userData?.user_avatar,
            address: userData?.user_address,
            phone: userData?.user_phone,
            country: userData?.user_country
        }
    }

    static filterUserAttributes(scope = 'detail') {
        switch (scope) {
            case 'brief': 
                const select = ['user_public_id', 'user_email', 'user_fullname', 'user_avatar'];
                return Object.fromEntries(select.map((ele) => {
                    return [ele, 1]
                }))

            case 'detail': 
                const notSelect = ['__v', 'user_password', 'updatedAt'];
                return Object.fromEntries(notSelect.map((ele) => {
                    return [ele, 0]
                }))

            default: return [];
        }
    }
}


module.exports = UserUtility;