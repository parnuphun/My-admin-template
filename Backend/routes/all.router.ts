import express from 'express'

const route = express()

route.use(require('../routes/iot_lab_routes'))

module.exports = route
