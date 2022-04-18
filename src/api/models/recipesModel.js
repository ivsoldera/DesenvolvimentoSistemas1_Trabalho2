const { ObjectId } = require('mongodb');
const { connection } = require('./conn');

const getRecipesCollection = async () => {
  const conn = await connection();
  return conn.collection('recipes');
}

const findAll = async () => {
  const recipes = await getRecipesCollection();
  return recipes.find().toArray();
}

const findById = async (id) => {
  try {
    const users = await getRecipesCollection();
    return users.findOne(ObjectId(id))
  } catch (error) {
    return 'recipe not found'
  }
}

const create = async (recipe) => {
  const recipes = await getRecipesCollection();
  const {insertedId} = await recipes.insertOne(recipe);
  return {_id: insertedId, ...recipe};
}

const edit = async (id, recipe) => {
  const recipes = await getRecipesCollection();
  const updaterecipe = await recipes.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: recipe },
      { returnOriginal: false }
  )
  console.log(updaterecipe);
  return updaterecipe.value;
}

const removeById = async (id) => {
  const recipes = await getRecipesCollection();
  const { deletedCount } = await 
  recipes.deleteOne({ _id: ObjectId(id) });
  if(!deletedCount) throw new Error ("Falha ao remover");
  return true;
}


module.exports = {
  findAll,
  findById,
  create,
  edit,
  removeById
};