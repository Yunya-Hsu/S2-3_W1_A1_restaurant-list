// 引入基本套件
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const Restaurant = require('./models/restaurant.js')


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
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body // 一個object
  Restaurant.create( newRestaurant )
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const result = req.body
  Restaurant.findById(id)
    .then(restaurant => {
      for (let key of Object.keys(result)) {
        restaurant[key] = result[key]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})



//FIXME: use mongoDB data to do search
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