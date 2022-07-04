const router = require('express').Router()
const http = require('./participants.http')

router.route('/:uuid/participants')
    .get(http.getParticipans)
    .post(http.postParticipans)


exports.router = router