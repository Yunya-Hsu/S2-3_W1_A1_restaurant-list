const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

const sortDetail = [
  { _id: 'asc' },
  { name: 'asc' },
  { name: 'desc' },
  { rating: 'desc' },
  { category: 'asc' },
  { location: 'asc' }
]

const sortName = [
  '預設',
  '餐廳名稱：A → Z',
  '餐廳名稱：Z → A',
  '評分：高 → 低',
  '類別',
  '地區'
]

router.get('/', (req, res) => {
  const userId = req.user._id
  const selectedSort = Number(req.query.OM) || 0
  const sortType = sortName[selectedSort]
  const keyword = req.query.keyword

  Restaurant.find({
    $or: [
      { $and: [{ userId }, { name: { $regex: keyword, $options: '$i' } }] },
      { $and: [{ userId }, { description: { $regex: keyword, $options: '$i' } }] }
    ]
  })
    .lean()
    .sort(sortDetail[selectedSort])
    .then(restaurants => {
      res.render('index', { restaurants, keyword, sortType })
    })
    .catch(error => console.error(error))
})

module.exports = router
