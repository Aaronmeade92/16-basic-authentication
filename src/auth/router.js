'use strict';

import express from 'express';
const authRouter = express.Router();
import User from './model.js';
import auth from './middleware.js';


authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( user => res.send(user.generateToken()) )
    .catch(next);
});

authRouter.get('/signin',auth, (req, res) => {
  res.cookie('Token', req.token);
  res.send('Hi');
});

export default authRouter;