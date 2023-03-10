const db = require('../../../src/database/models')
const fieldService = require('../../../src/services/fieldService')
const HttpError = require('../../../src/utils/errors/httpError')
const userAccessUtil = require('../../../src/utils/userAccessUtil')
describe('Tests for field service', () => {
  describe('Create field', () => {
    it('should create a field', async () => {
      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      jest.spyOn(db.ContentFields, 'findOne').mockResolvedValue(null)
      jest
        .spyOn(db.ContentFields, 'create')
        .mockResolvedValue({ name: 'test' })

      const field = await fieldService.createField(1, { name: 'test' })
      expect(field).toEqual({ name: 'test' })
    })
    it('should throw an error the field exists', async () => {
      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      jest.spyOn(db.ContentFields, 'findOne').mockResolvedValue(1, { id: 1 })

      try {
        const field = await fieldService.createField(1, { id: 1 })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
  })
  describe('Get fields for collection', () => {
    it('should return all the fields for a collection', async () => {
      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      jest
        .spyOn(db.ContentFields, 'findAll')
        .mockResolvedValue([{ name: 'test' }])
      const fields = await fieldService.getFieldsForCollection(1, { id: 1 })
      expect(fields).toEqual([{ name: 'test' }])
    })
    it('should throw an error when there is some error in the service', async () => {
      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      jest.spyOn(db.ContentFields, 'findAll').mockRejectedValue(new Error())
      try {
        await fieldService.getFieldsForCollection(1, { id: 1 })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })
  describe('Update field', () => {
    it('should update a field', async () => {
      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      jest
        .spyOn(db.ContentFields, 'findOne')
        .mockResolvedValue({ name: 'test' })
      jest.spyOn(db.ContentEntries, 'findOne').mockResolvedValue(null)
      jest
        .spyOn(db.ContentFields, 'update')
        .mockResolvedValue([1, [{ name: 'test' }]])
      const field = await fieldService.updateField(1, { id: 1 })
      expect(field).toEqual({ name: 'test' })
    })
    it('should throw an error when the field does not exist', async () => {
      jest.spyOn(db.ContentFields, 'findOne').mockResolvedValue(null)

      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      try {
        await fieldService.updateField(1, { id: 1 })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
    it('should throw an error when the records exists', async () => {
      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      jest
        .spyOn(db.ContentFields, 'findOne')
        .mockResolvedValue({ name: 'test' })
      jest.spyOn(db.ContentEntries, 'findOne').mockResolvedValue(1)

      try {
        await fieldService.updateField(1, { id: 1 })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
    it('should throw an error when the update is unsuccessful', async () => {
      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      jest
        .spyOn(db.ContentFields, 'findOne')
        .mockResolvedValue({ name: 'test' })
      jest.spyOn(db.ContentEntries, 'findOne').mockResolvedValue(null)
      jest
        .spyOn(db.ContentFields, 'update')
        .mockResolvedValue([0, [{ name: 'test' }]])
      try {
        await fieldService.updateField(1, { id: 1 })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
  })
  describe('Delete field', () => {
    it('should delete a field', async () => {
      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      jest
        .spyOn(db.ContentFields, 'findOne')
        .mockResolvedValue({ name: 'test' })
      jest.spyOn(db.ContentEntries, 'findOne').mockResolvedValue(null)
      jest.spyOn(db.ContentFields, 'destroy').mockResolvedValue(1)
      const field = await fieldService.deleteField(0, { id: 1 })
      expect(field).toEqual(1)
    })
    it('should throw an error when the field does not exist', async () => {
      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      jest.spyOn(db.ContentFields, 'findOne').mockResolvedValue(0)

      try {
        await fieldService.deleteField(1, { id: 1 })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
    it('should throw an error when the delete was unsuccessful', async () => {
      jest
        .spyOn(userAccessUtil, 'userHasAccessToCollection')
        .mockResolvedValue(true)

      jest
        .spyOn(db.ContentFields, 'findOne')
        .mockResolvedValue({ name: 'test' })
      jest.spyOn(db.ContentEntries, 'findOne').mockResolvedValue(null)
      jest.spyOn(db.ContentFields, 'destroy').mockResolvedValue(0)
      try {
        await fieldService.deleteField(1, { id: 1 })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
  })
})
