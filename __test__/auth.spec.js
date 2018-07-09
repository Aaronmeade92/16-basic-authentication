'use strict';

const superagent = require('superagent');
const mongoose = require('mongoose');
const app = require('../app.js');

describe('Authentication Server', () => {

  const PORT = 3001;

  afterAll( () => {
    app.stop();
    mongoose.connection.close();
  });
  it('gets a 401 on a bad login', () => {
    return superagent.get('http://localhost:3001/signin')
      .auth('foo','bar')
      .then(response => {
      })
      .catch(response => {
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 200 on a good login', () => {
    return superagent.get('http://localhost:3001/signin')
      .auth('john','foo')
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

});