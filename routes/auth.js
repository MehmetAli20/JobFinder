const express = require('express')
const router = express.Router()

const { register, login, updateUser } = require('../controllers/auth')
const authanticateUser = require ('../middleware/authentication')
const testUser = require ('../middleware/testUser')

const rateLimiter = require('express-rate-limit')

const APIlimiter = rateLimiter({
    windowMs: 15*60*1000,
    max:10,
    message: {
        msg:'Too many requests from this API, please try again after 15 minutes',
    },
})

router.post('/register', APIlimiter, register)
router.post('/login', APIlimiter, login)
router.patch('/updateUser', authanticateUser, testUser, updateUser)
module.exports = router
