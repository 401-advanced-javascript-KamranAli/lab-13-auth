const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

// middleware
const morgan = require('morgan');
const ensureAuth = require('./middleware/ensure-auth');
const ensureRole = require('./middleware/ensure-role');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// test route
app.get('/hello', (req, res) => {
  res.send('hello express');
});

app.use(checkConnection);

// API ROUTES
const auth = require('./routes/auth');
app.use('/api/auth', auth);

const rappers = require('./routes/rappers');
app.use('/api/rappers', ensureAuth(), rappers);

const rockstars = require('./routes/rockstars');
app.use('/api/rockstars', ensureAuth(), ensureRole(), rockstars);

const me = require('./routes/me');
app.use('/api/me', ensureAuth(), me);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;