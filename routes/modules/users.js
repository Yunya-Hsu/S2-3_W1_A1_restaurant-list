// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

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
  const {name, email, password, confirmedPassword} = req.body
  if (password !== confirmedPassword) {
    console.log('輸入密碼與確認密碼不相符') //TODO:跳回register頁面時提示”輸入＆確認密碼不相符“
    return res.render('register', {name, email})
  }
  
  // 到mongoDB尋找是否有該user
  Users.findOne({ email })
   .then(user => {
    if (user) {  //找到相同的email
      console.log('this account exists.') //TODO: 跳回register頁面時提示“使用者已存在”
      res.render('register', { name, email })
    }
    Users.create({ name, email, password }) //找不到user，所以建立該使用者
   })
   .then(() => res.render('login')) //TODO: 跳回login頁面
   .catch(err => console.log(err))
})

module.exports = router