const db = require('../../../src/database/models')
const HttpError = require('../../../src/utils/errors/httpError')
const { getUserCollections, userHasAccessToCollection } = require('../../../src/utils/userAccessUtil')

describe('Tests for user access util', () => {
  describe('Tests for get user collections', () => {
    it('should return all the collections for a user', async () => {
      jest.spyOn(db.ContentTypes, 'findAll').mockResolvedValue([{ dataValues: { name: 'test' } }])
      const collections = await getUserCollections({ id: 1 })
      expect(collections).toEqual([{ dataValues: { name: 'test' } }])
    })
    it('should throw an error when there is some error in the service', async () => {
      jest.spyOn(db.ContentTypes, 'findAll').mockRejectedValue(new Error())
      try {
        await userAccessUtil.getUserCollections({ id: 1 })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe('Tests for user has access to collection', () => {
    it('should return true if the user has access to the collection', async () => {
      jest.spyOn(db.ContentTypes, 'findAll').mockResolvedValue([{ dataValues: { id: 1, name: 'test' } }])
      const hasAccess = await userHasAccessToCollection(
        { id: 1 },
        1
      )
      expect(hasAccess).toEqual(true)
    })
    it('should throw an error if the user does not have access to the collection', async () => {
      jest.spyOn(db.ContentTypes, 'findAll').mockResolvedValue([{ dataValues: { id: 2, name: 'test' } }])
      try {
        await userHasAccessToCollection({ id: 1 }, 1)
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
    it('should throw an error if there is some error in the service', async () => {
      jest.spyOn(db.ContentTypes, 'findAll').mockRejectedValue(new Error())
      try {
        await userHasAccessToCollection({ id: 1 }, 1)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
    it('should throw an error if user do not have any collection', async () => {
      jest.spyOn(db.ContentTypes, 'findAll').mockResolvedValue(null)
      try {
        await userHasAccessToCollection({ id: 1 }, 1)
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError)
      }
    })
  })
})
