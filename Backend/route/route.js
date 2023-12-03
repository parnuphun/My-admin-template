const express = require('express')
const route = express.Router()
const login_c = require('../controller/login')
const persons_pd_c = require('../controller/personal_directory')

// login
route.post('/login',login_c.login)
route.post('/adminRegister',login_c.adminRegister)

// personal directory
route.get('/allPosition',persons_pd_c.allPosition)
route.post('/addPosition',persons_pd_c.addPosition)
route.post('/deletePosition',persons_pd_c.deletePosition)
route.get('/getPersonalOne',persons_pd_c.getPersonalOne)
route.post('/RenamePosition',persons_pd_c.RenamePosition)

module.exports = route;