const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');
const loginSchema = require('../schemas/loginSchema');
const {jwtData} = require('../config/auth');
const appError = require('../errors/appError');

const findByEmail = async (email) => userModel.findByEmail(email);

const auth = async (loginData) => {
  const {error} = loginSchema.validate(loginData);
  if(error) throw new appError("All fields must be filled", 401);

  const {email, password} = loginData;
  const userLogin = await findByEmail(email);

  if(!userLogin || userLogin.password !== password){
    throw new appError("Incorrect username or password", 401);
  }

  const {_id, role} = userLogin;
  const {secret, expiresIn, algorithm} = jwtData;
  const user = {_id, role, email};

  const token = jwt.sign({data: user}, secret, {
    expiresIn,
    algorithm
  });

  return token;
}

module.exports = {
  auth
}