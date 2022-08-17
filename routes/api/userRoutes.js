const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  removeFriend,
  updateUser,
  addFriend,
  deleteUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friend/:friendId').post(addFriend).delete(removeFriend);



module.exports = router;
