'use strict';

import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/', req, res => {
  res.statusCode = 200;
  res.statusMessage = 'All Good';
  
  fs.readFile(__dirname + './index.html', (err, data) => {
    if (err) { throw err; }
    res.write(data);
    res.acceptsEncodings();
  });
});