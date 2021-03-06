// 引入外部套件
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.PORT
const routers = require('./routes')
require('./config/mongoose')

const usePassport = require('./config/passport')
const app = express()

// 使用express-handlebars 為樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({ // 設定session
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true })) // 設定body-parser(解析post傳回來的req，body-parser已包在express中)
app.use(methodOverride('_method')) // 設定每一筆請求都會透過method-override進行前置處理
app.use(express.static('public')) // 設定靜態資料使用public資料夾
usePassport(app)

app.use(flash()) // 設定使用connect-flash

// 自訂一個全部使用的middleware，把isAuthenticated狀態傳給res.locals使用
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// 設定路由
app.use(routers)

// 啟動伺服器監聽
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})
