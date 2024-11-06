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
router.post("/", auth, createCards);
router.delete("/:_id", auth, deleteCards);
router.put("/:cardId/likes", auth, likeCard);
router.delete("/:cardId/likes", auth, dislikeCard);

module.exports = router;
