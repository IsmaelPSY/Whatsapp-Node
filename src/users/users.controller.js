const users = require('../database/models/init-models').initModels().users;


const getAll = async () =>{
    const allUsers = await users.findAll({})
    return allUsers
}
const getMyUser = async (id) =>{
    const user = await users.findOne({
        where:{
            id
        }
    })

    return user
}

const updateMyUser = async (id, data) =>{
    const update = await users.update({...data} ,  {where: {id}})
    if(update){
        const user = await users.findOne({
            where: {id}
        })
        return user
    }
    return null
}

const deleteUser = async (id) =>{
    const deleteUser = await users.destroy({
        where: {
            id
        }
    })
    return deleteUser
}

const getMeUser = async (email) =>{
    const user = await users.findOne({
        where: {
            email
        }
    })
    return user
}
module.exports = {
    getAll,
    getMyUser,
    updateMyUser,
    deleteUser,
    getMeUser
}