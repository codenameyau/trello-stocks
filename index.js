const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jobs = require('./server/jobs');

/********************************************************************
* CONFIGURATION
*********************************************************************/
require('dotenv').config();

const app = express();

// Setup bodyParser to let us parse POST data.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the static files path to public.
app.use(express.static(path.join(__dirname, 'public')));

// Set the server-side view engine to html.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Specify our default port.
const PORT = process.env.PORT || 3000;


/********************************************************************
* API ROUTING
*********************************************************************/

// Register router for api.
app.use('/api', require('./server/api/routes'));


/********************************************************************
* RUN SERVER
*********************************************************************/
app.listen(PORT, function () {
  jobs.updateBoard();
  console.log('[+] Listening to app on http://localhost:%s ', PORT);
});
