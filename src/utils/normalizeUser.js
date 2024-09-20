const normalizeUser = (userData) => {
    return {
        user_id: userData?.user_id,
        user_status: userData?.status,
        user_email: userData?.email,
        user_password: userData?.password,
        user_fullname: userData.fullname,
        user_avatar: userData?.user_id,
        user_address: userData?.address,
        user_phone: userData?.phone,
        user_country: userData?.country
    }
}

module.exports = normalizeUser;