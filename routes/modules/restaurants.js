// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const newRestaurant = req.body // 一個object
  newRestaurant.userId = req.user._id // 把 user 的 _id 加進去 newRestaurant 這個 object 中
  Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const result = req.body
  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      for (const key of Object.keys(result)) {
        restaurant[key] = result[key]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.error(error))
})

module.exports = router
