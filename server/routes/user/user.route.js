const express = require('express');

const route = express.Router();
const userController = require('../../controller/user/user.controller');

route.post('/register', userController.register);


module.exports = route;
