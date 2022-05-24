const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const adjustedKeyword = keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const searchResult = restaurants.filter(item =>
        item.name.toLowerCase().includes(adjustedKeyword) ||
        item.description.toLowerCase().includes(adjustedKeyword))
      res.render('index', { restaurants: searchResult, keyword })
    })
    .catch(error => console.error(error))
})

module.exports = router
