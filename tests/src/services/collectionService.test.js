const { UniqueConstraintError } = require('sequelize')
const db = require('../../../src/database/models')
const collectionService = require('../../../src/services/collectionService')
const HttpError = require('../../../src/utils/errors/httpError')
const userAccessUtil = require('../../../src/utils/userAccessUtil')
describe('Tests for Collection Service', () => {
  jest
    .spyOn(userAccessUtil, 'userHasAccessToCollection')
    .mockResolvedValue(true)

  describe('Tests for creating a collection', () => {
    it('should return the newly created collection', async () => {
      jest.spyOn(db.ContentTypes, 'create').mockResolvedValue({ name: 'test' })
      const collection = await collectionService.createCollection(
        {
          name: 'test'
        },
        {
          id: 1
        }
      )
      expect(collection).toEqual({ name: 'test' })
    })
    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(db.ContentTypes, 'create').mockRejectedValue(new Error())

      try {
        await collectionService.createCollection(
          { name: 'test' },
          {
            id: 1
          }
        )
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
    it('should throw an error when the collection already exists', async () => {
      jest
        .spyOn(db.ContentTypes, 'create')
        .mockRejectedValue(new UniqueConstraintError())
      try {
        await collectionService.createCollection({ name: 'test' }, { id: 1 })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
  })
  describe('Tests for getting all collections', () => {
    it('should return all the collections for a user', async () => {
      jest.spyOn(db.ContentTypes, 'findAll').mockResolvedValue([
        {
          name: 'test',
          ContentEntries: []
        }
      ])
      const collections = await collectionService.getAllCollections({ id: 1 })
      expect(collections).toEqual([{ name: 'test' }])
    })
    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(db.ContentTypes, 'findAll').mockRejectedValue(new Error())
      try {
        await collectionService.getAllCollections()
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })
  describe('Tests for updating a collection', () => {
    it('should return the updated collection', async () => {
      jest
        .spyOn(db.ContentTypes, 'update')
        .mockResolvedValue([[1], [{ name: 'test' }]])
      const collection = await collectionService.updateCollection(1, 'test', {
        id: 1
      })
      expect(collection).toEqual({ name: 'test' })
    })
    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(db.ContentTypes, 'update').mockRejectedValue(new Error())
      try {
        await collectionService.updateCollection(1, 'test', {
          id: 1
        })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
    it('should throw an error when the collection is not found', async () => {
      jest
        .spyOn(db.ContentTypes, 'update')
        .mockResolvedValue([0, [{ name: 'test' }]])
      try {
        await collectionService.updateCollection(
          { id: 1, name: 'test' },
          {
            id: 1
          }
        )
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
  })
})
