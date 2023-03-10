const Joi = require('joi')

const schemas = {
  authorization: Joi.object({
    authorization: Joi.string().required()
  }).options(
    {
      allowUnknown: true
    }
  ),
  createCollection: Joi.object({
    name: Joi.string().required()
  }),

  createField: Joi.object({
    collectionId: Joi.number().required(),
    name: Joi.string().required()
  }),
  createCollectionParams: Joi.object({
    id: Joi.number().required()
  }),
  newEntry: Joi.object({
    collectionId: Joi.number().required(),
    fields: Joi.object().required()
  }),
  modifyEntry: Joi.object({}),
  deleteEntryParams: Joi.object({
    id: Joi.number().required()
  }),
  patchField: Joi.object({})

}
const REQ_PARAMTERS = {
  BODY: 'body',
  HEADER: 'headers',
  QUERY: 'query',
  PARAMS: 'params'
}

/**
 *
 * @param {joi.Schema} schema
 * @param {String} parameterType

 */
const validate = (schema, parameterType) => (req, res, next) => {
  const { error } = schema.validate(req[parameterType])
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  next()
}

module.exports = { validate, REQ_PARAMTERS, schemas }
