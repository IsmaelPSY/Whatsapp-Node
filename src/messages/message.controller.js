const { message, conversations } = require('../database/models/init-models').initModels();
const uuid = require('uuid')

const postNewMessage = async (data) => {
    const id = uuid.v4()
    const fecha = new Date
    const today = fecha.getDate()
    const message = await message.create({
        id,
        ...data,
        createdAt: today
    })
    return message
}
const getFullConver = async (id) => {
    const fullConver = await conversations.findOne({
        where: { id },
        include: [
            {
                model: message,
                as: "message"
            }
        ]
    })
    return fullConver
}

module.exports = {
    postNewMessage,
    getFullConver
}