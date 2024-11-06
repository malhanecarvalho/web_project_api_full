const Cards = require("../models/card");
const { BadRequestError, NotFoundError } = require('../utils/errors/apiError');

module.exports.getCards = (request, response, next) => {
  Cards.find()
    .populate([{ path: "user", strictPopulate: false }])
    .then((card) => {
      if (!card) {
        throw new BadRequestError({ statusCode: 400, message: 'Algo deu errado' });
      }
      response.send(card)
    })
    .catch(next);
};

module.exports.deleteCards = (request, response, next) => {
  const { _id } = request.params;
  Cards.findByIdAndDelete(_id)
    .orFail(() => {
      throw new NotFoundError({ statusCode: 404, message: `Nenhum usuário encontrado com esse Id:[${_id}]`});
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ statusCode: 404, message: `Nenhum usuário encontrado com esse Id:[${_id}]`});
      }
      response.status(204).send("cartão excluido")})
    .catch(next);
};

module.exports.createCards = (request, response, next) => {
  const { name, link, owner } = request.body;
  const linkRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  const isValidAvatar = link.match(linkRegex);
  if (!isValidAvatar) {
    throw new BadRequestError({ statusCode: 400, message: 'Url inválida' });
  }
  Cards.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new BadRequestError({ statusCode: 400, message: 'Erro ao criar cartão' });
      }
      response.status(201).send(card)
    })
    .catch(next);
};

module.exports.likeCard = (request, response, next) => {
  const { cardId } = request.params
  Cards.findByIdAndUpdate({ _id: cardId }, { $set: { likes: request.user._id } }, { new: true }).then((docs) => {
    if (docs) {
      return response.status(200).json({ success: true, docs });
    } else {
      return response.status(404).json({ success: false, data: "no such user exist" });
    }
  }).catch(next);
};

module.exports.dislikeCard = (request, response, next) => {
  const { cardId } = request.params
  Cards.findByIdAndUpdate({ _id: cardId }, { $pull: { likes: request.user._id } }, { new: true }).then((docs) => {
    if (docs) {
      return response.status(200).json({ success: true, docs });
    } else {
      return response.status(404).json({ success: false, data: "no such user exist" });
    }
  }).catch(next);
};
