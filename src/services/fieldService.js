const db = require('../database/models')
const HttpError = require('../utils/errors/httpError')
const userUtil = require('../utils/userAccessUtil')

const createField = async (name, contentTypeId, user) => {
  await userUtil.userHasAccessToCollection(user, contentTypeId)

  const fieldExists = await db.ContentFields.findOne({
    where: {
      name,
      content_type_id: contentTypeId
    }
  })
  if (fieldExists) {
    throw new HttpError(400, 'A field with the same name already exists')
  }

  const dbResponse = await db.ContentFields.create({
    name,
    content_type_id: contentTypeId
  })
  return dbResponse
}

const getFieldsForCollection = async (collectionId, user) => {
  await userUtil.userHasAccessToCollection(user, collectionId)

  const dbResponse = await db.ContentFields.findAll({
    attributes: ['id', 'name'],
    where: {
      content_type_id: collectionId
    }
  })
  return dbResponse
}

// TODO: Work on optimizing it
const updateField = async (id, name, user) => {
  const fieldExists = await db.ContentFields.findOne({
    where: {
      id
    }
  })
  if (!fieldExists) {
    throw new HttpError(404, 'Field not found')
  }

  await userUtil.userHasAccessToCollection(user, fieldExists.content_type_id)

  const recordsExists = await db.ContentEntries.findOne({
    where: {
      content_type_id: fieldExists.content_type_id
    }
  })

  if (recordsExists) {
    throw new HttpError(400, 'Cannot update field name, records for this field exists. Please delete the records first.')
  }

  const dbResponse = await db.ContentFields.update(
    { name },
    {
      where: {
        id
      },
      returning: true
    }
  )
  if (dbResponse[0] === 0) {
    throw new HttpError(404, 'The field was not found')
  }
  return dbResponse[1][0]
}

const deleteField = async (id, user) => {
  const fieldExists = await db.ContentFields.findOne({
    where: {
      id

    }
  })
  await userUtil.userHasAccessToCollection(user, fieldExists.content_type_id)

  const dbResponse = await db.ContentFields.destroy({
    where: {
      id
    },
    returning: true
  })
  if (dbResponse === 0) {
    throw new HttpError(404, 'Field not found')
  }
  return dbResponse
}

module.exports = {
  createField,
  getFieldsForCollection,
  updateField,
  deleteField
}
