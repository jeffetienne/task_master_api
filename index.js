const winston = require('winston');
const express = require('express');
const app = express();

//const sql = require('mssql');
//const { Sequelize, DataTypes, Model } = require('sequelize');
//const sequelize = new Sequelize('mssql');
const statut = require('./model/status');
const connection_db = require('./startup/connection_db');

//require('./startup/logging')();
require('./startup/routes')(app);
//const connection_db = require('./startup/connection_db');
//require('./startup/config')();
//require('./startup/validation')();

//connection_db.connectToDb();
connection_db.authenticate().then((err) => {
    console.log('Connection successful', err);
    
})
.catch((err) => {
    console.log('Unable to connect to database', err);
});

//sequelise.import ('status', (sequelize, DataTypes))

//statut.create({name: 'Test2'});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;