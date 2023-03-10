// const { describe, it, expect, jest } = require('@jest/globals')
const collectionController = require('../../../src/controllers/collectionController')
const collectionService = require('../../../src/services/collectionService')
const HttpError = require('../../../src/utils/errors/httpError')

describe('Tests for Collection Controller', () => {
  describe('Tests for creating a collection', () => {
    const req = {
      body: {
        name: 'test'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return the newly created collection', async () => {
      jest
        .spyOn(collectionService, 'createCollection')
        .mockResolvedValue({ name: 'test' })
      await collectionController.createCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(collectionService, 'createCollection').mockRejectedValue(new Error())
      await collectionController.createCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an http error when the user enters some invalid data', async () => {
      jest
        .spyOn(collectionService, 'createCollection')
        .mockRejectedValue(new HttpError(400, 'Invalid data'))
      await collectionController.createCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })
  })

  describe('Tests for getting all collections', () => {
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return all the collections', async () => {
      jest
        .spyOn(collectionService, 'getAllCollections')
        .mockResolvedValue([{ name: 'test' }])
      await collectionController.getAllCollections(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(collectionService, 'getAllCollections').mockRejectedValue(new Error())
      await collectionController.getAllCollections(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })
  })

  describe('Tests for updating a collection', () => {
    const req = {
      params: {
        id: 'id'
      },
      body: {
        name: 'test'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return the updated collection', async () => {
      jest
        .spyOn(collectionService, 'updateCollection')
        .mockResolvedValue({ name: 'test' })
      await collectionController.updateCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(collectionService, 'updateCollection').mockRejectedValue(new Error())
      await collectionController.updateCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an http error when the user enters some invalid data', async () => {
      jest
        .spyOn(collectionService, 'updateCollection')
        .mockRejectedValue(new HttpError(400, 'Invalid data'))
      await collectionController.updateCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })
  })
})
