const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const app = express();

// SETANDO VARIÁVEIS DA APLICAÇÃO
app.set('port', process.env.PORT || config.get('server.port'));

// MIDDLEWARES
app.use(bodyParser.json());

// add routes to app
const plcRoutes = require("./api/routes/plcData");
app.use(plcRoutes);

module.exports = app;