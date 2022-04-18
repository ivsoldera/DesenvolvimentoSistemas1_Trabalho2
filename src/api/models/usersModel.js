const { ObjectId } = require('mongodb');
const { connection } = require('./conn');

const getUsersCollection = async () => {
    const conn = await connection();
    return conn.collection('users');
}

const findAll = async () => {
    const users = await getUsersCollection();
    return users.find().toArray();
}

const findById = async (id) => {
    const users = await getUsersCollection();
    return users.findOne(ObjectId(id))
}

const findByEmail = async (email) => {
    const users = await getUsersCollection();
    return users.findOne({email});
}

const create = async (user) => {
    const users = await getUsersCollection();
    const {insertedId} = await users.insertOne(user);
    console.log(insertedId)
    return {_id: insertedId, ...user};
}

const edit = async (id, user) => {
    const users = await getUsersCollection();
    const updateUser = await users.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: user },
        { returnDocument: 'after' }
    )
    return updateUser.value;
}

const removeById = async (id) => {
    const users = await getUsersCollection();
    const { deletedCount } = await 
    users.deleteOne({ _id: ObjectId(id) });
    if(!deletedCount) throw new Error ("Falha ao remover");
    return true;
}


module.exports = {
    findAll,
    findByEmail,
    findById,
    create,
    edit,
    removeById
};