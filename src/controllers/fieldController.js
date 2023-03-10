const routeResponseHandler = require('../utils/responseHandler')
const fieldService = require('../services/fieldService')

const createField = async (request, response) => {
  try {
    const { name, collectionId } = request.body
    const data = await fieldService.createField(name, collectionId)
    routeResponseHandler.handleRouteSuccess(
      response,
      'Field created',
      data,
      201
    )
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}

const getFieldsForCollection = async (request, response) => {
  try {
    const { id } = request.params
    const data = await fieldService.getFieldsForCollection(id)
    routeResponseHandler.handleRouteSuccess(response, 'All fields', data)
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}

const updateField = async (request, response) => {
  try {
    const { id } = request.params
    const { name } = request.body
    const data = await fieldService.updateField(id, name)
    routeResponseHandler.handleRouteSuccess(response, 'Field updated', data)
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}

const deleteField = async (request, response) => {
  try {
    const { id } = request.params
    const data = await fieldService.deleteField(id)
    routeResponseHandler.handleRouteSuccess(response, 'Field deleted', data)
  } catch (error) {
    routeResponseHandler.handleRouteError(error, response)
  }
}

module.exports = {
  createField,
  getFieldsForCollection,
  updateField,
  deleteField
}
