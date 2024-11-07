const { celebrate, Joi } = require('celebrate');
const validator = require("validator");
const router = require("express").Router();
const auth = require('../middleware/auth');

const {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
} = require("../controllers/cardController");


router.get("/", auth, getCards);
router.delete("/:_id", auth, deleteCards);
router.put("/:cardId/likes", auth, likeCard);
router.delete("/:cardId/likes", auth, dislikeCard);

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

router.post("/", auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    owner: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  })
}), createCards);

module.exports = router;
