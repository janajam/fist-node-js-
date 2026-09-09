const express =require('express');
const {createUser,getAllUsers} = require('../controller/userController');
const router = express.Router();

router.post('/users', createUser);
router.get('/users',getAllUsers)

module.exports = router;