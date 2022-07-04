const users = require('../database/models/init-models').initModels().users;
const uuid =require('uuid')
const crypto = require('../tools/crypto')

const registerNewUser = async (data) =>{
    const id = uuid.v4()
    const hashPassword = crypto.hashPassword(data.password)
    const newUser = await users.create({
        id,
        ...data,
        password: hashPassword
    })
    return newUser
}


const getMyUserByEmail = async (email) => {
    const myUser = await users.findOne({
        where:{
            email
        }
    })
    return myUser
}
module.exports = {
    registerNewUser,
    getMyUserByEmail
}