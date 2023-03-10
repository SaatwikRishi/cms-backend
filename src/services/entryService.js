const db = require('../database/models')
const HttpError = require('../utils/errors/httpError')
const userUtil = require('../utils/userAccessUtil')
const verifyDBFields = (dbFields, fields) => {
  const finalJsonValues = {}
  dbFields = dbFields.map((e) => e.dataValues)
  for (const field of dbFields) {
    if (!fields[field.name]) {
      throw new HttpError(400, `Field ${field.name} is required`)
    }
    finalJsonValues[field.name] = fields[field.name]
  }
  return finalJsonValues
}

const createEntryForCollection = async (collectionId, fields, user) => {
  await userUtil.userHasAccessToCollection(user, collectionId)

  const dbFields = await db.ContentFields.findAll({
    where: {
      content_type_id: collectionId
    }
  })

  const finalJsonValues = verifyDBFields(dbFields, fields)
  const dbResponse = await db.ContentEntries.create({
    content_type_id: collectionId,
    json: finalJsonValues
  })
  return dbResponse
}

const getAllEntriesForCollection = async (id, user) => {
  await userUtil.userHasAccessToCollection(user, id)

  const dbResponse = await db.ContentEntries.findAll({
    attributes: ['id', 'json'],
    where: {
      content_type_id: id
    }
  })
  return dbResponse
}

const modifyEntryForCollection = async (entryId, fields, user) => {
  const entries = await db.ContentEntries.findOne({
    where: {
      id: entryId
    }
  })
  await userUtil.userHasAccessToCollection(user, entries.content_type_id)

  const dbFields = await db.ContentFields.findAll({
    where: {
      content_type_id: entries.content_type_id
    }
  })

  if (dbFields.length === 0) {
    throw new HttpError(404, 'Entry not found')
  }

  const json = verifyDBFields(dbFields, fields)
  const dbResponse = await db.ContentEntries.update(
    { json },
    {
      where: {
        id: entryId
      }
    }
  )
  if (dbResponse[0] === 0) {
    throw new HttpError(404, 'Entry not found')
  }
  return dbResponse
}

const deleteEntryForCollection = async (id, userId) => {
  const entries = await db.ContentEntries.findOne({
    where: {
      id
    }
  })
  await userUtil.userHasAccessToCollection(userId, entries.content_type_id)

  const dbResponse = await db.ContentEntries.destroy({
    where: {
      id
    }
  })
  if (dbResponse === 0) throw new HttpError(404, 'Entry not found')
  return dbResponse
}
module.exports = {
  createEntryForCollection,
  getAllEntriesForCollection,
  modifyEntryForCollection,
  deleteEntryForCollection
}
