const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const bcrypt = require('bcryptjs')

const Users = require('../models/users')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true // req 一定要放在後面callback function的第一個變數
    },

    (req, email, password, done) => {
      Users.findOne({ email })
        .then(user => {
          if (!user) { // 用email搜尋帳號無果，不提供 passport 任何使用者資訊
            req.flash('loginFail', '此帳號未被註冊，請確認輸入是否正確、或進行註冊')
            return done(null, false)
          }

          // 找到user後，開始驗證密碼。分為兩種情況：
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) { // 驗證失敗，不提供 passport 任何使用者資訊
                req.flash('loginFail', '密碼有誤，請重新輸入。')
                return done(null, false)
              }
              return done(null, user) // 驗證成功
            })
        })
        .catch(err => done(err, false))
    }))

  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['email', 'displayName']
    }, 
    
    (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    Users.findOne({ email })
      .then(user => {
        if (user) return done(null, user)

        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => Users.create({
            name,
            email,
            password: hash
          }))
        .then(user => done(null, user))
        .catch(err => done(err, false))
      })
    })
  )

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
