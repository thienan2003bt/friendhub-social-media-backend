'use strict';
const router = require('express').Router();
const asyncHandler = require('../helpers/asyncHandler.helper');
const UserController = require('../controllers/user.controller');


router.get('/', asyncHandler(UserController.findAllUsers));

router.get('/:user_id', asyncHandler(UserController.findUserById));

router.post('/create', asyncHandler(UserController.createNewUser));

router.patch('/update/:user_id', asyncHandler(UserController.updateUser));

router.delete('/delete/:user_id', asyncHandler(UserController.deleteUser));

module.exports = router;