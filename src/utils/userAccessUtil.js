const db = require('../database/models')
const HttpError = require('./errors/httpError')
const getUserCollections = async (user) => {
  const collections = await db.ContentTypes.findAll({
    where: {
      user_id: user.id
    }
  })
  return collections
}
const userHasAccessToCollection = async (user, collectionId) => {
  const collections = await getUserCollections(user)
  if (!collections) {
    throw new HttpError(401, 'You do not have access to this collection')
  }
  const mappedCollections = collections.map((e) => e.dataValues)
  const collection = mappedCollections.find((e) => e.id === collectionId)
  if (!collection) {
    throw new HttpError(401, 'You do not have access to this collection')
  }
  return true
}

module.exports = { getUserCollections, userHasAccessToCollection }
