'use strict';
const router = require('express').Router();
const asyncHandler = require('../helpers/asyncHandler.helper');
const UserController = require('../controllers/user.controller');


router.get('/', asyncHandler(UserController.findAllUsers));

router.post('/create', asyncHandler(UserController.createNewUser));


module.exports = router;