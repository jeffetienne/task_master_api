const winston = require('winston');
const express = require('express');
const app = express();
const sql = require('mssql');

//require('./startup/logging')();
require('./startup/routes')(app);
connection_db = require('./startup/connection_db');
//require('./startup/config')();
//require('./startup/validation')();

connection_db.connectToDb(sql);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;