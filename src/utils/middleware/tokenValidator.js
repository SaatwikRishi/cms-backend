const { default: axios, AxiosError } = require('axios')
const HttpError = require('../errors/httpError')

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      throw new HttpError(401, 'Token not found')
    }
    const response = await axios.get(
      `${process.env.AUTH_SERVICE_URL}/auth/validate`,
      { token }
    )
    req.user = response.data
    next()
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(error.response.status).json({ message: error.response.data.message ?? 'Internal server error' })
    } else if (error instanceof HttpError) {
      res.status(error.code).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = { validateToken }
