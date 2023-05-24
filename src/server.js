'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const logger = require('../api-server/src/middleware/logger');

// Esoteric Resources
const errorHandler = require('../auth-server/src/error-handlers/500.js');
const notFound = require('../auth-server/src/error-handlers/404.js');
const authRoutes = require('../auth-server/src/auth/routes.js');
const v1Routes = require('../api-server/src/routes/v1.js');
// Prepare the express app
const app = express();

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // use logger from api

// Routes
app.use(authRoutes);
app.use('/api/v1', v1Routes);

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
