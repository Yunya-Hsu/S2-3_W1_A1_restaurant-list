// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 設定路由
// 登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router