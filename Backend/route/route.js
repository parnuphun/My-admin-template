const express = require('express');
const route = express.Router()
const login_c = require('../controller/login')

route.post('/login',login_c.login);
route.post('/adminRegister',login_c.adminRegister);

module.exports = route;