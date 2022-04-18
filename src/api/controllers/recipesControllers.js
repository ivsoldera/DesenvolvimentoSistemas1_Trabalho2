const recipesServices = require('../services/recipesServices');

const findAll = (async (_request, response) => {
  const results = await recipesServices.findAll();
  response.json(results);
});

const findById = (async (request, response) => {
  try {
    const { id } = request.params;

    const result = await recipesServices.findById(id);
    if (result === 'recipe not found') {
      response.status(404)
      .json({ message: 'recipe not found' })
    } else {
        response.json(result);
    }
  } catch (error) {
    return error
  }
})

const create = (async (request, response) => {
  const { name, ingredients, preparation } = request.body;
  const { _id, ...recipes } = await recipesServices.create({
      name,
      ingredients,
      preparation
  })
  const RECIPES = {   
    name: recipes.name,
    ingredients: recipes.ingredients,
    preparation: recipes.preparation,
    userId: request.user._id,
    _id: _id
}
  response.status(201).json({
    recipe: RECIPES
  })
});

const edit = (async (request, response) => {
  const { id } = request.params;

  const results = await recipesServices.edit(id, request.body);
  response.json({...results, userId: request.user._id});
});

const remove = (async (request, response) => {
  const { id } = request.params;

  await recipesServices.remove(id);
  return response.status(204)
  .json({ message: "Usuário removido com sucesso"})
});


module.exports = {
  findAll,
  findById,
  create,
  edit,
  remove
};