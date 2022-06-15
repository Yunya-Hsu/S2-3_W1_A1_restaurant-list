// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

const sortWay = [
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
  Restaurant.find({ userId })
    .lean()
    .sort(sortWay[selectedSort])
    .then(restaurants => {
      res.render('index', { restaurants, sortType })
    })
    .catch(error => console.error(error))
})

module.exports = router
