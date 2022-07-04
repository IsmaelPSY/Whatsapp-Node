const router = require('express').Router()
const passport = require('passport')
require('../tools/auth.passport')(passport)
const http = require('./conversation.http')

router.route('/')
    .get(http.getAllConversation)
    .post(passport.authenticate('jwt', {session: false}), http.postConversation)

router.route('/:uuid')
    .get(passport.authenticate('jwt', {session: false}), http.getMyConversations)
    .put(passport.authenticate('jwt', {session: false}), http.updateMyConversations)
    .delete(passport.authenticate('jwt', {session: false}), http.deleteConversation)

exports.router = router