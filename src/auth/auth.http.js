const controllers = require('./auth.controller')
const jwt = require('jsonwebtoken')
const toPromise = require('../tools/toPromise').toPromise
const config = require('../config')



const registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Invalid Data' })
    }
    const [newUser, err] = await toPromise(controllers.registerNewUser(req.body))
    if (err) {
        return res.status(400).json({ message: 'Internal Error' })
    }
    console.log(newUser)
    res.status(201).json(newUser)
}

const loginUser = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Invalid Credentials' })
    }

    const [myUser, err] = await toPromise(controllers.getMyUserByEmail(req.body.email))
    if (err || !myUser) {
        return res.status(401).json({ message: 'Invalid Email' })
    }

    const verification = crypto.comparePassword(req.body.password, myUser.password)
    if (!verification) {
        return res.status(401).json({ message: 'Invalid Password' })
    }
    const token = jwt.sign({
        id: myUser.id,
        email: req.body.email
    }, config.jwtSecret)

    res.status(200).json({ token })
}

module.exports = {
    registerUser,
    loginUser
}