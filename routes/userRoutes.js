const express =require('express');
const {createUser,getAllUsers,updateUser,getUserById} = require('../controller/userController');
const router = express.Router();

router.post('/users', createUser);
router.get('/users',getAllUsers)
router.get('/users/:id',getUserById)
router.put('/users/:id',updateUser)
module.exports = router;