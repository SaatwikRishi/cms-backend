const entryService = require('../../../src/services/entryService')
const HttpError = require('../../../src/utils/errors/httpError')
const userAccessUtil = require('../../../src/utils/userAccessUtil')
const db = require('../../../src/database/models')

describe('Tests for Entry Service', () => {
  jest.spyOn(userAccessUtil, 'userHasAccessToCollection').mockResolvedValue(true)

  describe('Tests for creating an entry', () => {
    it('should return the newly created entry when fields are there', async () => {
      jest.spyOn(db.ContentFields, 'findAll').mockResolvedValue([
        {
          dataValues: {
            name: 'test'
          }
        }
      ])
      jest
        .spyOn(db.ContentEntries, 'create')
        .mockResolvedValue({ name: 'test' })

      const entry = await entryService.createEntryForCollection(1, {
        test: 'test'
      })
      expect(entry).toEqual({ name: 'test' })
    })
    it('should throw an error when a field is missing', async () => {
      jest.spyOn(db.ContentFields, 'findAll').mockResolvedValue([
        {
          dataValues: {
            name: 'test'
          }
        }
      ])

      try {
        await entryService.createEntryForCollection(1, {})
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
  })
  describe('Tests for getting all entries', () => {
    it('should return all the entries for a collection', async () => {
      jest
        .spyOn(db.ContentEntries, 'findAll')
        .mockResolvedValue([{ name: 'test' }])
      const entries = await entryService.getAllEntriesForCollection(1)
      expect(entries).toEqual([{ name: 'test' }])
    })
    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(db.ContentEntries, 'findAll').mockRejectedValue(new Error())
      try {
        await entryService.getAllEntriesForCollection(1)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })
  describe('Tests for updating an entry', () => {
    it('should return true when entry is updated', async () => {
      jest.spyOn(db.ContentEntries, 'findOne').mockResolvedValue({
        content_type_id: 1
      })
      jest.spyOn(db.ContentFields, 'findAll').mockResolvedValue([
        {
          dataValues: {
            name: 'name'

          }
        }
      ])
      jest
        .spyOn(db.ContentEntries, 'update')
        .mockResolvedValue({ name: 'test' })
      const entry = await entryService.modifyEntryForCollection(1, {
        name: 'test'
      })
      expect(entry).toEqual({ name: 'test' })
    })
    it('should throw an error when DB fields are not found', async () => {
      jest.spyOn(db.ContentEntries, 'findOne').mockResolvedValue({
        content_type_id: 1
      })
      jest.spyOn(db.ContentFields, 'findAll').mockResolvedValue([])
      try {
        await entryService.modifyEntryForCollection(1, {
          name: 'test'
        })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
    it('should throw an error when entry is not found', async () => {
      jest.spyOn(db.ContentEntries, 'findOne').mockResolvedValue({
        content_type_id: 1
      })
      jest.spyOn(db.ContentFields, 'findAll').mockResolvedValue([
        {
          dataValues: {
            name: 'name'

          }
        }
      ])
      jest
        .spyOn(db.ContentEntries, 'update')
        .mockResolvedValue([0, { name: 'test' }])

      try {
        await entryService.modifyEntryForCollection(1, {
          name: 'test'
        })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
  })
  describe('Tests for deleting an entry', () => {
    it('should return true when entry is deleted', async () => {
      jest.spyOn(db.ContentEntries, 'findOne').mockResolvedValue({
        content_type_id: 1
      })
      jest
        .spyOn(db.ContentEntries, 'destroy')
        .mockResolvedValue(1)
      const entry = await entryService.deleteEntryForCollection(1)
      expect(entry).toEqual(1)
    })
    it('should throw an error when entry is not found', async () => {
      jest.spyOn(db.ContentEntries, 'findOne').mockResolvedValue({
        content_type_id: 1
      })
      jest
        .spyOn(db.ContentEntries, 'destroy')
        .mockResolvedValue(0)
      try {
        await entryService.deleteEntryForCollection(1)
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
  })
})
