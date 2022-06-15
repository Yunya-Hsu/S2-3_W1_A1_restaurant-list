module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login') // 為登入者全部導向登入頁面
  }
}