const router = require('express').Router()
const http = require('./message.http')
const passport = require('passport')
require('../tools/auth.passport')(passport)

router.route('/:uuid/message')
    .get(passport.authenticate('jwt', {session: false}), http.getMessage)
    .post(passport.authenticate('jwt', {session: false}), http.postMessage)
    //.delete()



exports.router = router