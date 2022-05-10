const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json').results

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))




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
  const searchResult = restaurants.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurants: searchResult, keyword: keyword})
})



app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})