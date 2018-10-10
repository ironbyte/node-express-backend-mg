// *************************************************************************************
// REQUIRE STATEMENTS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const { port, env, logs } = require('./config/vars');

require('./config/mongoose');
require('./api/models/user.model');
require('./config/passport');
// *************************************************************************************

// Initiate the app
const app = express();

// Initialize the passport
app.use(passport.initialize());

// *************************** Configure the app **************************************
app.use(cors());
app.use(morgan(logs));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// *************************************************************************************

//Models & routes
app.get('/', (request, response) => response.status(200).send(`Hello from PP NodeJS backend API server.</br>The API landing is at http://localhost:${port}/api/`));
app.use('/api', require('./api/routes'));

// Start the server
app.listen(port, () => console.log(`NodeJS backend API (ProjectPegasus) server running on localhost:${port} | node environment: ${env}`));
