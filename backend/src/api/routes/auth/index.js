const { Router } = require('express')

const {
  authenticateController,
  logoutController,
  requestMessageController,
  verifyController,
} = require('../../controllers/auth/index.js')

const router = Router()

router.post('/request-message', requestMessageController)

router.post('/verify', verifyController)

router.get('/authenticate', authenticateController)

router.get('/logout', logoutController)

module.exports = router
