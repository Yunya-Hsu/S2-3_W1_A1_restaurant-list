// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/auth', auth)
router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router
