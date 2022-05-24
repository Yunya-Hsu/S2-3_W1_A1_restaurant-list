// 引入外部套件
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const port = 3000
const routers = require('./routes')
require('./config/mongoose')

const app = express()

// 使用express-handlebars 為樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true })) // 設定body-parser(解析post傳回來的req，body-parser已包在express中)
app.use(methodOverride('_method')) // 設定每一筆請求都會透過method-override進行前置處理
app.use(express.static('public')) // 設定靜態資料使用public資料夾

// 設定路由
app.use(routers)

// 啟動伺服器監聽
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})
