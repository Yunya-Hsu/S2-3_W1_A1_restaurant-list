const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Users = require('../models/users')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      Users.findOne({ email })
        .then(user => {
          if ((!user) || (user.password !== password)) { // 密碼不符、或者用email搜尋帳號無果，不提供 passport 任何使用者資訊
            req.flash('loginFail', '帳號密碼有誤，請重新輸入。')
            return done(null, false)
          }
          return done(null, user)
        })
        .catch(err => console.log(err))
    }
  ))

  // 序列化，把id存到req.session.passport.user下
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  // 反序列化，透過req.session.passport.user存的id找回完整資料把它存在req.user下
  passport.deserializeUser((userId, done) => {
    Users.findById(userId)
      .lean()
      .then(user => done(null, user))
      .catch(err => console.log(err))
  })
}
