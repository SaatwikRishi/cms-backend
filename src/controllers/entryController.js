const routeResponseHandler = require('../utils/responseHandler')
const entryService = require('../services/entryService')
const createEntryForCollection = async (request, response) => {
  try {
    const { collectionId, fields } = request.body

    const data = await entryService.createEntryForCollection(collectionId, fields, request.user)
    routeResponseHandler.handleRouteSuccess(
      response,
      'Entry created',
      data,
      201
    )
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}

const getAllEntriesForCollection = async (request, response) => {
  try {
    const { id } = request.params
    const data = await entryService.getAllEntriesForCollection(id, request.user)
    routeResponseHandler.handleRouteSuccess(response, 'All entries', data)
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}

const modifyEntryForCollection = async (request, response) => {
  try {
    const { id } = request.params
    const fields = request.body
    const data = await entryService.modifyEntryForCollection(id, fields, request.user)
    routeResponseHandler.handleRouteSuccess(
      response,
      'Entry modified',
      data
    )
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}

const deleteEntryForCollection = async (request, response) => {
  try {
    const { id } = request.params
    const data = await entryService.deleteEntryForCollection(id, request.user)
    routeResponseHandler.handleRouteSuccess(
      response,
      'Entry deleted',
      data
    )
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}
module.exports = {
  createEntryForCollection,
  getAllEntriesForCollection,
  modifyEntryForCollection,
  deleteEntryForCollection
}
