const conversations = require('../database/models/init-models').initModels().conversations;
const participants = require('../database/models/init-models').initModels().participants;
const users = require('../database/models/init-models').initModels().users
const uuid = require('uuid')


const postPartici = async (data, idC) => {
    const id = uuid.v4()
    const fecha = new Date
    const today = fecha.getDate()
    const participan = await participants.create({
        id,
        ...data,
        conversation_id: idC,
        createdAt: today
    })
    return participan
}
const getPartici = async (id) => {
    const conversation = await conversations.findOne({
        where: {
            id
        },
        attributes:{
            exclude: ['createdAt', 'updatedAt'],
        },
        include: [{
            model: participants,
            as: 'participants',
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            include: [{
                model: users,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password'],
                    },
                }
            ],
           
        }, 
    ],
    });
    return conversation;
};
module.exports = {
    postPartici,
    getPartici
}