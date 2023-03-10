const entryController = require('../../../src/controllers/entryController')
const entryService = require('../../../src/services/entryService')
const HttpError = require('../../../src/utils/errors/httpError')
describe('Tests for Entry Controller', () => {
  describe('Tests for creating an entry', () => {
    const req = {
      body: {
        collectionId: 'test',
        fields: {
          name: 'test'
        }
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return the newly created entry', async () => {
      jest
        .spyOn(entryService, 'createEntryForCollection')
        .mockResolvedValue({ name: 'test' })
      await entryController.createEntryForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(entryService, 'createEntryForCollection').mockRejectedValue(new Error())
      await entryController.createEntryForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an http error when the user enters some invalid data', async () => {
      jest
        .spyOn(entryService, 'createEntryForCollection')
        .mockRejectedValue(new HttpError(400, 'Invalid data'))
      await entryController.createEntryForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })
  })
  describe('Tests for getting all entries for a collection', () => {
    const req = {
      params: {
        collectionId: 'test'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return all the entries for a collection', async () => {
      jest
        .spyOn(entryService, 'getAllEntriesForCollection')
        .mockResolvedValue([{ name: 'test' }])
      await entryController.getAllEntriesForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(entryService, 'getAllEntriesForCollection').mockRejectedValue(new Error())
      await entryController.getAllEntriesForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an http error when the user enters some invalid data', async () => {
      jest
        .spyOn(entryService, 'getAllEntriesForCollection')
        .mockRejectedValue(new HttpError(400, 'Invalid data'))
      await entryController.getAllEntriesForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })
  })
  describe('Tests for getting entries for a collection', () => {
    const req = {
      params: {
        collectionId: 'test'
      },
      query: {
        fields: 'name'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return all the entries for a collection', async () => {
      jest
        .spyOn(entryService, 'getAllEntriesForCollection')
        .mockResolvedValue([{ name: 'test' }])
      await entryController.getAllEntriesForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(entryService, 'getAllEntriesForCollection').mockRejectedValue(new Error())
      await entryController.getAllEntriesForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })
  })

  describe('Tests for Modifying an entry for a collection', () => {
    const req = {
      params: {
        collectionId: 'test',
        entryId: 'test'
      },
      body: {
        fields: {
          name: 'test'
        }
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return the modified entry', async () => {
      jest
        .spyOn(entryService, 'modifyEntryForCollection')
        .mockResolvedValue({ name: 'test' })
      await entryController.modifyEntryForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(entryService, 'modifyEntryForCollection').mockRejectedValue(new Error())
      await entryController.modifyEntryForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an http error when the user enters some invalid data', async () => {
      jest
        .spyOn(entryService, 'modifyEntryForCollection')
        .mockRejectedValue(new HttpError(400, 'Invalid data'))
      await entryController.modifyEntryForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })
  })
  describe('Tests for deleting an entry for a collection', () => {
    const req = {
      params: {
        collectionId: 'test',
        entryId: 'test'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    it('should return the modified entry', async () => {
      jest
        .spyOn(entryService, 'deleteEntryForCollection')
        .mockResolvedValue({ name: 'test' })
      await entryController.deleteEntryForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(entryService, 'deleteEntryForCollection').mockRejectedValue(new Error())
      await entryController.deleteEntryForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalled()
    })

    it('should throw an http error when the user enters some invalid data', async () => {
      jest
        .spyOn(entryService, 'deleteEntryForCollection')
        .mockRejectedValue(new HttpError(400, 'Invalid data'))
      await entryController.deleteEntryForCollection(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalled()
    })
  })
})
