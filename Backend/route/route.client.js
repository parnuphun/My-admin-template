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
route.post('/getAllfilsClient',client_c.getAllfilsClient)
route.post('/previewFileClient',client_c.previewFileClient)
route.post('/getPersonTreeclient',client_c.getPersonTreeclient)
route.post('/getPersonCateListClient',client_c.getPersonCateListClient)
route.post('/getTeachingSClient',client_c.getTeachingSClient)
route.post('/getStudentSClient',client_c.getStudentSClient)
route.post('/getClassClient',client_c.getClassClient)
route.post('/getSyllabusClient',client_c.getSyllabusClient)

module.exports = route