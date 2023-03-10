const { UniqueConstraintError } = require('sequelize')
const { Sequelize } = require('../database/models')
const db = require('../database/models')
const HttpError = require('../utils/errors/httpError')

const createCollection = async (name, user) => {
  try {
    const dbResponse = await db.ContentTypes.create({
      name,
      user_id: user.id
    })
    return dbResponse
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new HttpError(
        400,
        'A collection with the same name already exists'
      )
    }
  }
}

const getAllCollections = async (user) => {
  const dbResponse = await db.ContentTypes.findAll({
    subQuery: false,
    attributes: ['id', 'name'],
    include: [
      {
        model: db.ContentEntries
      }
    ],
    where: {
      user_id: user.id
    }
  })

  dbResponse.forEach((e) => {
    e.dataValues.count = e.dataValues.ContentEntries.length
    delete e.dataValues.ContentEntries
  })

  return dbResponse
}

const updateCollection = async (id, name, user) => {
  const dbResponse = await db.ContentTypes.update(
    {
      name
    },
    {
      where: {
        id,
        user_id: user.id
      },
      returning: true
    }
  )
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
