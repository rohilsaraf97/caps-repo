const { Router } = require('express')
const {
  getAllSubscriptionsController,
  addSubscriptionController,
  deleteSubscriptionController,
} = require('../../controllers/subscriptions')

const authMiddleware = require('../../middlewares/auth/index.js')

const router = Router()

router.get('/', [authMiddleware], getAllSubscriptionsController)

router.post('/add', [authMiddleware], addSubscriptionController)

router.delete('/delete', [authMiddleware], deleteSubscriptionController)

module.exports = router
