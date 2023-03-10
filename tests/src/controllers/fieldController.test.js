const HttpError = require('../../../src/utils/errors/httpError')
const fieldService = require('../../../src/services/fieldService')
const fieldController = require('../../../src/controllers/fieldController')
describe('Tests for field controller', () => {
  describe('Tests for creating a field', () => {
    const req = {
      body: {
        collectionId: 'test',
        name: 'test',
        type: 'text'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return the newly created field', async () => {
      jest
        .spyOn(fieldService, 'createField')
        .mockResolvedValue({ name: 'test' })
      await fieldController.createField(req, res)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(fieldService, 'createField').mockRejectedValue(new Error())
      await fieldController.createField(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an http error when the user enters some invalid data', async () => {
      jest
        .spyOn(fieldService, 'createField')
        .mockRejectedValue(new HttpError(400, 'Invalid data'))
      await fieldController.createField(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })
  })
  describe('Tests for getting all fields for a collection', () => {
    const req = {
      params: {
        collectionId: 'test'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return all the fields for a collection', async () => {
      jest
        .spyOn(fieldService, 'getFieldsForCollection')
        .mockResolvedValue([{ name: 'test' }])
      await fieldController.getFieldsForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest
        .spyOn(fieldService, 'getFieldsForCollection')
        .mockRejectedValue(new Error())
      await fieldController.getFieldsForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an http error when the user enters some invalid data', async () => {
      jest
        .spyOn(fieldService, 'getFieldsForCollection')
        .mockRejectedValue(new HttpError(400, 'Invalid data'))
      await fieldController.getFieldsForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })
  })
  describe('Tests for updating a field', () => {
    const req = {
      params: {
        IDBCursorWithValue: 'test'
      },
      body: {
        name: 'test',
        type: 'text'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return the updated field', async () => {
      jest
        .spyOn(fieldService, 'updateField')
        .mockResolvedValue({ name: 'test' })
      await fieldController.updateField(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(fieldService, 'updateField').mockRejectedValue(new Error())
      await fieldController.updateField(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an http error when the user enters some invalid data', async () => {
      jest
        .spyOn(fieldService, 'updateField')
        .mockRejectedValue(new HttpError(400, 'Invalid data'))
      await fieldController.updateField(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })
  })
  describe('Tests for deleting a field', () => {
    const req = {
      params: {
        id: 'test'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    it('should return true when the field is deleted', async () => {
      jest.spyOn(fieldService, 'deleteField').mockResolvedValue(true)
      await fieldController.deleteField(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(fieldService, 'deleteField').mockRejectedValue(new Error())
      await fieldController.deleteField(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })
  })
})
