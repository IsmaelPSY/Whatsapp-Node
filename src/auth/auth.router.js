const router = require('express').Router()
const passport = require('passport')
require('../tools/auth.passport')(passport)
const http = require('./auth.http')

router.route('/signup')
    .post(http.registerUser)
router.route('/login')
    .get(http.loginUser)
    .post(http.loginUser)
    .get(http.loginUser)

exports.router = router