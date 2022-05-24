const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: '$i' } },
      { description: { $regex: keyword, $options: '$i' } }
    ]
  })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.error(error))
})


module.exports = router
