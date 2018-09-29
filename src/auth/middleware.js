'use strict';

import User from './users.js';

export default (req, res, next) => {

  let authenticate = (auth) => {
    User.authenticate(auth)
      .then(user => {
        if (!user) {
          getAuth();
        }
        else {
          req.token = user.generateToken();
          next();
        }
      })
      .catch(next);

  };

  let getAuth = () => {
 
    next({status:401,statusMessage:'Unauthorized',message:'Invalid User ID/Password'});
  };

  try {
    let auth = {};
    let authHeader = req.headers.authorization;

    if(!authHeader) {
      return getAuth();
    }

    if(authHeader.match(/basic/i)) {

      let base64Header = authHeader.replace(/Basic\s+/i, ''); // ZnJlZDpzYW1wbGU=
      let base64Buffer = Buffer.from(base64Header,'base64'); // <Buffer 01 02...>
      let bufferString = base64Buffer.toString(); // john:mysecret
      let [username,password] = bufferString.split(':');  // variables username="john" and password="mysecret"
      auth = {username,password};  // {username:"john", password:"mysecret"}

      authenticate(auth);
    }
  } catch(e) {
    next(e);
  }

};

