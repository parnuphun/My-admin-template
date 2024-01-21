const express = require('express')
const route = express.Router()
const db = require('../config/database');

const client_c = require('../controller/client')

route.post('/clientMainPage',client_c.mainPage)
route.post('/clientGetNewsContent',client_c.getNewsContent)
route.post('/getNewsListClient',client_c.getNewsListClient)
route.post('/getNewsLengthClient',client_c.getNewsLengthClient)
route.post('/getActivityImageListClient',client_c.getActivityImageListClient)
route.post('/getActivityImageLengthClient',client_c.getActivityImageLengthClient)

module.exports = route