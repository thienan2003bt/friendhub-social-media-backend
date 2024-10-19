'use strict';
const router = require('express').Router();
const crypto = require('crypto');

router.get('/random', (req, res, next) => {
    return res.status(200).send("UUID: " + crypto.randomUUID());
})

router.use('/users', require('./user.route'))
router.use('/access', require('./access.route'))

module.exports = router;