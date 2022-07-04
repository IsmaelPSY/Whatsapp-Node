const controllers = require('./users.controller')
const toPromise = require('../tools/toPromise').toPromise
//!const crypto = require('../tools/crypto')


const getAllUsers = async (req, res) =>{
    const users = await controllers.getAll()
    res.status(200).json(users)
}

const getOneUser = async (req, res) =>{
    if(!req.params.uuid){
        return res.status(400).json({message: 'Invalid User Id'})
    }
    const [myUser, err] = await toPromise(controllers.getMyUser(req.params.uuid))
    if(err){
        return res.status(401).json({message: 'Invalid User Credential'})
    }
    res.status(200).json(myUser)
}
const updateUser = async (req, res) =>{
    if(!req.user.id){
        return res.status(401).json({message: 'Invalid id'})
    }
    if(req.params.uuid !== req.user.id){
        return res.status(400).json({message: 'Wrong user'})
    }
    if(!req.body){
        return res.status(400).json({message: 'Missing data'})
    }
    const [myUser, err] = await toPromise(controllers.updateMyUser(req.params.uuid, req.body))
    if(err){
        return res.status(401).json({message: 'Invalid data'})
    }
    res.status(200).json(myUser)
}
const deleteUser = async (req, res) =>{
    if(!req.params.uuid){
        return res.status(401).json({message: 'Forbidden'})
    }
    const [value , err] = await toPromise(controllers.deleteUser(req.params.uuid))
    if(err){
        return res.status(400).json({message: 'Invalid User id'})
    }

    res.status(202).json({message: `Deleted user ${value} succesfully`})
}

const getMe = async (req, res) =>{

    if(!req.user.id){
        return res.status(400).json({message: 'Invalid id'})
    }

    const [user, err] = await toPromise(controllers.getMeUser(req.user.email))
    
    if(err){
        return res.status(400).json({message: 'Invalid User Email'})
    }

    res.status(200).json(user)
}

module.exports = {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    getMe
}