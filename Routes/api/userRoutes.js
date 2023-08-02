const router = require('express').Router();

const {
    allUsers,
    singleUser,
    createUser,
    updateUser,
    deleteUser,
    addFreind,
    deleteFriend,
} = require('../controllers/usercontroller');

router.route('/').get(allUsers).post(createUser);

router.route('/:userId').get(singleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;