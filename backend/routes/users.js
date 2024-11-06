const router = require("express").Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');

const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUserMe,
  updateUserAvatar,
  deleteUsers,
} = require("../controllers/userControllers");

router.get("/", auth, getAllUsers);
router.get("/me/:_id", auth, getCurrentUser);
router.get("/me/:_id", auth, getUserById);
router.patch("/me/:_id", auth, updateUserMe);
router.patch("/me/:_id", auth,  updateUserAvatar);
router.delete("/me/:_id", auth, deleteUsers);

module.exports = router;