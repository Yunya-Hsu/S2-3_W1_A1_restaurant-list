// 引入套件
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant.js')
const restaurantList = require('./restaurant.json').results

db.once('open', () => {
  Restaurant.insertMany(restaurantList)
    .catch(error => console.log(error))
  console.log('Restaurant seeder creation is done.')
})
