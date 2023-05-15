const { Router } = require('express')
const {
  getAllCampaignsController,
  addCampaignController,
  editCampaignController,
} = require('../../controllers/campaigns')

const authMiddleware = require('../../middlewares/auth/index.js')
const path = require('path')
const multer = require('multer')
const { v4 } = require('uuid')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../../campaignThumbnails/'))
  },
  filename: function (req, file, cb) {
    cb(null, v4() + '-' + Date.now() + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage,
  fileFilter,
})

const router = Router()

router.get('/', [authMiddleware], getAllCampaignsController)

router.post(
  '/add',
  [authMiddleware, upload.single('image')],
  addCampaignController
)

router.put(
  '/edit',
  [authMiddleware, upload.single('image')],
  editCampaignController
)

router.delete('/delete')

module.exports = router
