const router = require('express').Router()
const controller = require('../controllers/collectionController')
const { validateToken } = require('../utils/middleware/tokenValidator')
const {
  validate,
  schemas,
  REQ_PARAMTERS
} = require('../utils/middleware/validator')
router
  .route('/')
  .get(
    validate(schemas.authorization, REQ_PARAMTERS.HEADER),
    validateToken,
    controller.getAllCollections
  )
  .post(
    validate(schemas.createCollection, REQ_PARAMTERS.BODY),
    validateToken,
    controller.createCollection
  )

router.patch(
  '/:id',
  validate(schemas.createCollectionParams, REQ_PARAMTERS.PARAMS),
  validate(schemas.createCollection, REQ_PARAMTERS.BODY),
  validateToken,
  controller.updateCollection
)

module.exports = router
