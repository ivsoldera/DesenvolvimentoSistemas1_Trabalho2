const loginServices = require('../services/loginServices');

const login = async (request, response) => {
  const token = await loginServices.auth(request.body);

  return response.status(200).json({token});
}

module.exports = { 
  login
}