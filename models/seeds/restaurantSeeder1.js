if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 引入套件
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant.js')
const Users = require('../users')
const restaurantList = require('./restaurant.json').results
const bcrypt = require('bcryptjs')

const SEED_USER_1 = {
  email: 'user1@example.com',
  password: '12345678',
  restaurants: [restaurantList[1], restaurantList[2], restaurantList[3]]
}

db.once('open', () => {
  let userId = ''
  Users.findOne({ email: SEED_USER_1.email })
    .then(user => {
      if (user) return userId = user._id // 若已有帳號，則不建立，但把userId存下來

      return bcrypt.genSalt(10) // 沒帳號，所以建立該種子帳號
        .then(salt => bcrypt.hash(SEED_USER_1.password, salt))
        .then(hash => Users.create({
          name: SEED_USER_1.name,
          email: SEED_USER_1.email,
          password: hash
        }))
    })
    .then(user => {
      userId = user._id
      const toBeAdd = SEED_USER_1.restaurants
      for (let x = 0; x < toBeAdd.length; x++) { // 把必填的資料userId放入
        toBeAdd[x].userId = userId
      }
      return Promise.all(Array.from(
        { length: 1 },
        (_, i) => Restaurant.insertMany(toBeAdd)
      ))
    })
    .then(() => {
      console.log('Restaurant seeder creation is done.')
      process.exit()
    })
})
