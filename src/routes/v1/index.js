const express = require('express')
const UserController = require('../../controller/user-controller')
const { authValidator } = require('../../middleware/index')
const router = express.Router();

router.post('/signup', authValidator.validateUserAuth, UserController.create)
router.post('/signin', authValidator.validateUserAuth, UserController.signIn)

router.get('/isAuthenticated', UserController.isAuthenticated)

router.get('/isAdmin', authValidator.validateAdminRole, UserController.isAdmin)

module.exports = router