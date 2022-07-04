const controllers = require('./conversation.controller')
const toPromise = require('../tools/toPromise').toPromise

const postConversation = async (req , res) =>{
    if(!req.body){
        return res.status(400).json({message: 'Invalid credential'})
    }
    const [newCon , err] = await toPromise(controllers.createConversation(req.body))
    if(err){ 
        return res.status(400).json({message: 'Error'})
    }

    res.status(201).json(newCon)
}
const getAllConversation = async (req, res) =>{
    const conver = await controllers.getAllConversations()
    res.status(200).json(conver)
}

const getMyConversations = async (req, res) => {
    if(!req.params.uuid){
        return res.status(400).json({message: 'Invalid Credentials'})
    }
    const myCon = await  controllers.getMyCon(req.params.uuid)
    if(!myCon){
        return res.status(400).json({message: 'Invalid Credentials'})
    }

    if(req.user.id !== myCon.created_by){
        return res.status(400).json({message: 'Invalid Credentials'})
    }
    res.status(200).json(myCon)
}


const updateMyConversations = async (req, res) =>{
    if(!req.params.uuid){
        return res.status(400).json({message: 'Invalid Credentials'})
    }
    const myConUdate = await controllers.updateCon(req.body, req.params.uuid)
    if(!myConUdate){
        return res.status(400).json({message: 'Invalid Credentials'})
    }
    res.status(200).json(myConUdate)
}

const deleteConversation = async (req, res) =>{
    if(!req.params.uuid){
        return res.status(400).json({message: 'Invalid Credentials 1'})
    }
    const deleteCon = await controllers.deleteConv(req.params.uuid)
    if(!deleteCon){
        return res.status(400).json({message: 'Invalid Credentials 2'})
    }
    res.status(202).json({message: 'Conversation delete succesfully'})
}
module.exports = {
    postConversation,
    getAllConversation,
    getMyConversations,
    updateMyConversations,
    deleteConversation
}