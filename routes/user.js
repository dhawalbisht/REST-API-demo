const express = require('express')
const {handleUsers, getUserById, getUpdateUserById, createUser, deleteUser} = require('../controllers/user')
const router = express.Router()


router.route('/').get(handleUsers).post(createUser)
router.route('/:id').get(getUserById).patch(getUpdateUserById).delete(deleteUser)


module.exports =  router