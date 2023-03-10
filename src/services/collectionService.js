const { UniqueConstraintError } = require('sequelize')
const db = require('../database/models')
const HttpError = require('../utils/errors/httpError')

const createCollection = async (name, userId) => {
  try {
    const dbResponse = await db.ContentTypes.create({
      name,
      user_id: userId
    })
    return dbResponse
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new HttpError(400, 'A collection with the same name already exists')
    }
  }
}

const getAllCollections = async (user) => {
  const dbResponse = await db.ContentTypes.findAll({
    attributes: [
      'id', 'name'
    ],
    where: {
      user_id: user
    }
  })
  return dbResponse
}

const updateCollection = async (id, name, user) => {
  const dbResponse = await db.ContentTypes.update({
    name
  }, {
    where: {
      id,
      user_id: user
    },
    returning: true
  })
  if (dbResponse[0] === 0) {
    throw new HttpError(404, 'Collection not found')
  }
  return dbResponse[1][0]
}

module.exports = {
  createCollection,
  getAllCollections,
  updateCollection

}
