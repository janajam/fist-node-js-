const express =require('express');
const {createUser,getAllUsers,updateUser,getUserById,deleteUser} = require('../controller/userController');
const {verifyToken,authorizeRole}=require('../middleware/authMiddlewar')
const router = express.Router();

router.post('/users', createUser);
router.get('/users',verifyToken,authorizeRole('admin'),getAllUsers)
router.get('/users/:id',getUserById)
router.put('/users/:id',updateUser)
router.delete('/users/:id',deleteUser)

module.exports = router;