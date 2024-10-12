'use strict';
const router = require('express').Router();
const crypto = require('crypto');

router.get('/random-api-key', (req, res, next) => {
    return res.status(200).send("UUID for API key: " + crypto.randomUUID());
})

router.use('/users', require('./user.route'))

module.exports = router;