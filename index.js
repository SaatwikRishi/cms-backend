// Create express app
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000
const collectionRoutes = require('./src/routes/collectionRoutes')
const fieldRoutes = require('./src/routes/fieldRoutes')
const entryRoutes = require('./src/routes/entryRoutes')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/collections', collectionRoutes)
app.use('/api/fields', fieldRoutes)
app.use('/api/entries', entryRoutes)
app.use('*', (request, response) => {
  response.status(404).json({ error: 'Not found' })
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
