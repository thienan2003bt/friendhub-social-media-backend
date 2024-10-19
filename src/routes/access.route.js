'use strict';
const router = require('express').Router();
const AccessController = require('../controllers/access.controller');
const asyncHandler = require('../helpers/asyncHandler.helper');


router.post("/login", asyncHandler(AccessController.login))
router.post("/logout", asyncHandler(AccessController.logout))
router.post("/signup", asyncHandler(AccessController.signup))

module.exports = router;