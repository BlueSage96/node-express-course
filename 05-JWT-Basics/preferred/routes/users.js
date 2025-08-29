const express = require('express');
const router = express.Router();
const {login, hello} = require('../controllers/users');
const authMiddleware = require('../middleware/auth')

router.route('/hello').get(authMiddleware,hello);//will add authMiddleware later
router.route('/logon').post(login);

module.exports = router;