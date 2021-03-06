// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const Users = require('../../models/users')

// 設定路由
// 登入頁
router.get('/login', (req, res) => {
  res.render('login', {
    successLogout: req.flash('successLogout'),
    registerSuccess: req.flash('registerSuccess'),
    notLogin: req.flash('notLogin'),
    loginFail: req.flash('loginFail')
  })
})

// 驗證登入
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
})
)

// 註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊送出後驗證資料
router.post('/register', (req, res) => {
  const { name, email, password, confirmedPassword } = req.body

  if (password !== confirmedPassword) {
    req.flash('wrongConfirm', '輸入密碼與確認密碼不相符，請重新輸入')
    return res.render('register', {
      name,
      email,
      password,
      wrongConfirm: req.flash('wrongConfirm')
    })
  }

  // 到mongoDB尋找是否有該user
  Users.findOne({ email })
    .then(user => {
    // 找到相同的email
      if (user) {
        req.flash('existedUser', '此帳號已經存在，請選擇其他email進行註冊')
        return res.render('register', {
          name,
          email,
          password,
          confirmedPassword,
          existedUser: req.flash('existedUser')
        })
      }

      // 找不到user，所以建立該使用者。
      // 先使用bcrypt處理password（產生鹽->加鹽->用加鹽的結果取代原本密碼)，再建立帳號
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash =>
          Users.create({
            name,
            email,
            password: hash
          }))
        .then(() => {
          req.flash('registerSuccess', '您已成功註冊，請登入帳號')
          res.redirect('/users/login')
        })
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('successLogout', '您已成功登出')
  res.redirect('/users/login')
})

module.exports = router
