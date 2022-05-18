// 引入基本套件
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const restaurants = require('./restaurant.json').results //FIXME:


// 使用express-handlebars 為樣版引擎
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// 設定body-parser(解析post傳回來的req，body-parser已包在express中)
app.use(express.urlencoded({extended: true}))


// 設定靜態資料使用public資料夾
app.use(express.static('public'))


// 與mongoDB連線
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoDB error.')
})
db.once('open', () => {
  console.log('mongoDB connected!')
})


// 設定路由
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants})
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const theRestaurant = restaurants.filter(item => item.id === Number(id))
  res.render('show', {restaurants: theRestaurant[0]})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const adjustedKeyword = keyword.trim().toLowerCase()
  const searchResult = restaurants.filter(item => item.name.toLowerCase().includes(adjustedKeyword) || item.description.toLowerCase().includes(adjustedKeyword))
  res.render('index', { restaurants: searchResult, keyword})
})


// 啟動伺服器監聽
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})