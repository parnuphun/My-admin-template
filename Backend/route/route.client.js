const express = require('express')
const route = express.Router()
const db = require('../config/database');

const client_c = require('../controller/client')

route.post('/clientMainPage',client_c.mainPage)
route.post('/clientGetNewsContent',client_c.getNewsContent)


module.exports = route