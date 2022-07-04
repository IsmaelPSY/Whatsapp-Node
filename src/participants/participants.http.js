const controllers = require('./participants.controller')
const toPromise = require('../tools/toPromise').toPromise

const postParticipans = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'Misssing Data 1'
        })
    }
    const newPar = await controllers.postPartici(req.body, req.params.uuid)

    if (!newPar) {
        return res.status(400).json({
            message: 'Missing Data 2'
        })
    }
    res.status(201).json(newPar)
}
const getParticipans = async (req, res) => {

    const [data, err] = await toPromise(controllers.getPartici(req.params.uuid))
    console.log(data)
    if (!err || data) {
        res.status(200).json(data)

    } else {
        res.status(400).json({
            message: 'error'
        })
    }
}
module.exports = {
    postParticipans,
    getParticipans
}