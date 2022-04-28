const express = require('express');

const initConnectionToDb = require('../db/connection');
const users = require('../ressources/users/users.controller');

module.exports = function init() {
  initConnectionToDb();

  const app = express();

  app.use(express.json());
  app.use('/api/v1/users', users);

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Listenning on port ${port}`));
};
