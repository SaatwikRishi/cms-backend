const router = require('express').Router()
const controller = require('../controllers/fieldController')
const { validateToken } = require('../utils/middleware/tokenValidator')
const {
  validate,
  schemas,
  REQ_PARAMTERS
} = require('../utils/middleware/validator')
router
  .route('/')
  .post(
    validate(schemas.createField, REQ_PARAMTERS.BODY),
    validateToken,
    controller.createField
  )

router
  .route('/:id')
  .get(
    validateToken,
    validate(schemas.deleteEntryParams, REQ_PARAMTERS.PARAMS),
    controller.getFieldsForCollection
  )
  .patch(
    validate(schemas.deleteEntryParams, REQ_PARAMTERS.PARAMS),
    validate(schemas.patchField, REQ_PARAMTERS.BODY),
    validateToken,
    controller.updateField
  )
  .delete(
    validate(schemas.deleteEntryParams, REQ_PARAMTERS.PARAMS),
    validateToken,
    controller.deleteField
  )
module.exports = router
