'use strict';

require('dotenv').config();

require('babel-register');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

require('./app.js').start(process.env.PORT);