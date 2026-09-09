const express =require('express');
const {createUser,getAllUsers,getUserById} = require('../controller/userController');
const router = express.Router();

router.post('/users', createUser);
router.get('/users',getAllUsers)
router.get('/users/:id',getUserById)
module.exports = router;