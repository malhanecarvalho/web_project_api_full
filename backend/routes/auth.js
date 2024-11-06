const routerAuth = require("express").Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');

const {
    getCurrentUser,
    createUsers,
    login 
  } = require("../controllers/userControllers");

  routerAuth.post("/signin", celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    })
  }), login);
  
  routerAuth.post("/signup", celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
      name: Joi.string().optional().min(2).max(30),
      about: Joi.string().optional().min(2).max(30),
      avatar: Joi.string().optional().uri(),
    })
  }), createUsers);

  //routerAuth.get("users/me/:_id", auth, getCurrentUser);

  module.exports = routerAuth;