// 引入套件
const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantList = require('./restaurant.json').results

// 建立mongoDB連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error.')
})

// 連線成功後，建立種子資料
db.once('open', () => {
  console.log('mongoDB connected!')
  Restaurant.insertMany(restaurantList)
    .catch(error => console.log(error))
  console.log('Restaurant seeder creation is done.')
})
