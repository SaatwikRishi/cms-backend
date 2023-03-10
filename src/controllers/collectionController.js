const routeResponseHandler = require('../utils/responseHandler')
const collectionService = require('../services/collectionService')
const createCollection = async (request, response) => {
  try {
    const { name } = request.body
    const data = await collectionService.createCollection(name)
    routeResponseHandler.handleRouteSuccess(
      response,
      'Collection created',
      data,
      201
    )
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}

const getAllCollections = async (request, response) => {
  try {
    const data = await collectionService.getAllCollections()
    routeResponseHandler.handleRouteSuccess(response, 'All collections', data)
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}

const updateCollection = async (request, response) => {
  try {
    const { id } = request.params
    const { name } = request.body
    const data = await collectionService.updateCollection(id, name)
    routeResponseHandler.handleRouteSuccess(
      response,
      'Collection updated',
      data
    )
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}

module.exports = {
  createCollection,
  getAllCollections,
  updateCollection
}
