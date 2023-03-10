const router = require('express').Router()
const controller = require('../controllers/entryController')
const { validateToken } = require('../utils/middleware/tokenValidator')
const {
  validate,
  schemas,
  REQ_PARAMTERS
} = require('../utils/middleware/validator')

router
  .route('/')
  .post(
    validate(schemas.newEntry, REQ_PARAMTERS.BODY),
    validateToken,
    controller.createEntryForCollection
  )

router
  .route('/:id')
  .put(
    validate(schemas.modifyEntry, REQ_PARAMTERS.BODY),
    validateToken,
    controller.modifyEntryForCollection
  )
  .delete(
    validate(schemas.deleteEntryParams, REQ_PARAMTERS.PARAMS),
    validateToken,
    controller.deleteEntryForCollection
  )
  .get(validateToken, controller.getAllEntriesForCollection)

module.exports = router
