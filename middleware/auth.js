module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    req.flash('notLogin', '請先登入才能使用')
    res.redirect('/users/login') // 為登入者全部導向登入頁面
  }
}