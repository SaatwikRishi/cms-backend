const HttpError = require('./errors/httpError')

const handleRouteSuccess = (response, message, data, status = 200) => {
  return response.status(status).json({
    message,
    data
  })
}

const handleRouteError = (error, response) => {
  console.log(error)
  if (error instanceof HttpError) {
    response.status(error.code).json({
      message: error.message
    })
  } else {
    response.status(500).json({
      message: 'Something went wrong'
    })
  }
}
module.exports = { handleRouteError, handleRouteSuccess }
