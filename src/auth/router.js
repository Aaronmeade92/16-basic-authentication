'use strict';

import express from 'express';
const authRouter = express.Router();
import User from './users.js';
import auth from './middleware.js';


authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( user => res.send(user.generateToken()) )
    .catch(next);
});

authRouter.get('/signin',auth, (req, res) => {
  console.log('what is this');
  res.cookie('Token', req.token);
  res.send('Hi');
});

export default authRouter;