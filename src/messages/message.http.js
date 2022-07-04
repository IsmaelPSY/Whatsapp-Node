const controllers = require('./message.controller')

const postMessage = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({message: 'Missing Data'})
    }

    const myMessage = await controllers.postNewMessage(req.body, req.params.uuid)
    if(!myMessage){
        return res.status(400).json({message: 'Invalid message'})
    }

    res.status(201).json(myMessage)
}
const getMessage = async (req, res) =>{
    if(!req.params.uuid){
        return res.status(400).json({message: 'Missing Data'})
    }
    const fullConversation = await controllers.getFullConver(req.params.uuid)
    if(!fullConversation){
        return res.status(400).json({message: 'Missing Data'})
    }
    res.status(200).json(fullConversation)
}
module.exports ={
    postMessage,
    getMessage
}