// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const flash = require('connect-flash')

const Users = require('../../models/users')

// 設定路由
// 登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

// 註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmedPassword } = req.body

  if (password !== confirmedPassword) {
    req.flash('wrongConfirm', '輸入密碼與確認密碼不相符，請重新輸入')
    res.locals.wrongConfirm = req.flash('wrongConfirm')
    return res.render('register', { name, email, password })
  }

  // 到mongoDB尋找是否有該user
  Users.findOne({ email })
    .then(user => {
    // 找到相同的email
      if (user) {
        req.flash('existedUser', '此帳號已經存在，請選擇其他email進行註冊')
        res.locals.existedUser = req.flash('existedUser')
        return res.render('register', { name, email, password, confirmedPassword })
      }
      // 找不到user，所以建立該使用者
      Users.create({ name, email, password })
        .then(() => res.redirect('/')) // 建立後傳回首頁
        .catch(err => console.log(err))
    })
})

module.exports = router
