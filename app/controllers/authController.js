const express = require('express');


const User = require('../models/user');

const router = express.Router();

module.exports = app => app.use('/auth', router);