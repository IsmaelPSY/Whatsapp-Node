const conversations = require('../database/models/init-models').initModels().conversations
const uuid = require('uuid')


const getAllConversations = async () =>{
    const conver = await conversations.findAll({})
    return conver
}
const createConversation = async (data) =>{
    const id = uuid.v4()
    const fecha = new Date
    const today = fecha.getDate()
    const newConver = await conversations.create({
        id,
        ...data,
        createdAt: today
    })
    return newConver
}
const getMyCon = async (id) =>{
    const userCon = await conversations.findOne({
        where:{
            id
        }
    })
    return userCon
}

const updateCon = async (body, id) => {
    const fecha = new Date
    const today = fecha.getDate()
    const conversationU = await conversations.update({...body, updatedAt: today} ,  {where: {id}})
    if(!conversationU){
        return null
    }
    const update = await getMyCon(id)
    return update
}
const deleteConv = async (id) =>{
    const deleteCon = await conversations.destroy({
        where:{
            id
        }
    })
    return deleteCon
}
module.exports = {
    createConversation,
    getAllConversations,
    getMyCon,
    updateCon,
    deleteConv
}