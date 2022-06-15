const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Users = require('../models/users')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    {
      usernameField: 'email'
    },
    (email, password, done) => {
      Users.findOne({ email })
        .then(user => {
          if (!user) return done(null, false) // 用email搜尋無結果，不提供 passport 任何使用者資訊
          if (user.password !== password) return done(null, false) // 密碼不符，不提供 passport 任何使用者資訊
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
