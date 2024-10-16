'use strict';
const router = require('express').Router();
const AccessController = require('../controllers/access.controller');
const asyncHandler = require('../helpers/asyncHandler.helper');


router.post("/login", asyncHandler(AccessController.login))

module.exports = router;