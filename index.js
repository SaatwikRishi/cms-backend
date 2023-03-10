// Create express app
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/collections', require('./src/routes/collectionRoutes'))
app.use('/api/fields', require('./src/routes/fieldRoutes'))
app.use('/api/entries', require('./src/routes/entryRoutes'))
app.use('*', (request, response) => {
  response.status(404).json({ error: 'Not found' })
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
