const recipesModel = require('../models/recipesModel');
const recipeschema = require('../schemas/recipesSchema');
const appError = require('../errors/appError');

const findAll = async () => recipesModel.findAll();

const findById = async (id) => recipesModel.findById(id);

const create = async (recipe) => {
  const {value, error} = recipeschema.validate(recipe);
  if(error){
      throw new appError("Invalid entries. Try again.", 400);
  }

  return recipesModel.create(value)
}

const edit = async (id, recipe) => {
  const {error} = recipeschema.validate(recipe);
  if(error){
      throw new appError("Erro geral", 400);
  }

  return recipesModel.edit(id, recipe);
}

const remove = async (id) => {
  try {
      return recipesModel.removeById(id);
  } catch(error){
      throw new appError("Erro ao remover registro", 400);
  }
}

module.exports = {
  findAll,
  findById,
  create,
  edit, 
  remove
}