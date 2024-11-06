const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { BadRequestError, NotFoundError } = require('../utils/errors/apiError');
const { createHash } = require('../utils/hash');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getAllUsers = (request, response, next) => {
  User.find({})
    .then((user) => {
      if (!user) {
        throw new BadRequestError({ statusCode: 400, message: 'Algo deu errado' });
      }
      response.status(200).json(user)
    })
    .catch(next);
};

module.exports.getUserById = (request, response, next) => {
  const { _id } = request.params;
  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError({ statusCode: 404, message: `Nenhum usuário encontrado com esse Id:[${_id}]`});
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ statusCode: 404, message: `Nenhum usuário encontrado com esse Id:[${_id}]`});
      }
      response.status(200).json(user)
    })
    .catch(next);
};

module.exports.updateUserMe = (request, response, next) => {
  const { _id } = request.params;
  const { body } = request;
  User.findByIdAndUpdate(_id, body)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ statusCode: 404, message: `Nenhum usuário encontrado com esse Id:[${_id}]`});
      }
      response.status(200).send(user)
    })
    .catch(next);
};

module.exports.updateUserAvatar = (request, response, next) => {
  const { _id } = request.params;
  const { avatar } = request.body;
  User.findByIdAndUpdate(_id, avatar)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ statusCode: 404, message: `Nenhum usuário encontrado com esse Id:[${_id}]`});
      }
      response.status(200).user(user)
    })
    .catch(next);
};

module.exports.deleteUsers = (request, response, next) => {
  const { _id } = request.params;
  User.findByIdAndDelete(_id)
    .orFail(() => {
      throw new NotFoundError({ statusCode: 404, message:`Nenhum usuário encontrado com esse Id:[${_id}]`});
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ statusCode: 404, message: `Nenhum usuário encontrado com esse Id:[${_id}]`});
      }
      response.status(204).json()
    })
    .catch(next);
};

module.exports.createUsers = (request, response, next) => {
  const { name = "Jacques Cousteau", about = "Explorer", avatar = "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg", email, password } = request.body;
  const hashedPassword = createHash(password);
  const linkRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  const isValidAvatar = avatar.match(linkRegex);
  if (!isValidAvatar) {
    throw new BadRequestError({ statusCode: 400, message: 'Url inválida' });
  }
  User.create({ name, about, avatar, email, password: hashedPassword })
    .then((user) => {
      if (!user) {
        throw new BadRequestError({ statusCode: 400, message: 'Erro ao criar usúario' });
      }
      response.status(201).send(user)
    })
    .catch(next);
};

module.exports.login = (request, response, next) => {
  const { email, password } = request.body;

  User.findUserByCredentials(email, password)
    .then(({ user }) => {
      if (!user) {
        throw new BadRequestError({ statusCode: 400, message: 'Email ou senha incorretos' });
      }else {
        response.status(200).json({
          userId: user._id,
          token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
            expiresIn: '7d'
          }),
        });
      } 
    })
    .catch(next);
};

module.exports.getCurrentUser = (request, response, next) => {
  const { _id } = request.params;
  User.findById(_id).then((user) => {
    if (!user) {
      throw new NotFoundError({ statusCode: 404, message: `Nenhum usuário encontrado com esse Id:[${_id}]`});
    }
    response.status(200).json({ user });
  })
    .catch(next);
};

