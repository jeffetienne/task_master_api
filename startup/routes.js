const express = require('express');
const types = require('../routes/type-demande');
const demandes = require('../routes/demande');
const log_modifications = require('../routes/log-modifications');
const modification_application = require('../routes/modification-application');
const modification_dossier = require('../routes/modification-dossier');
const task = require('../routes/task');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/types', types);
  app.use('/api/demandes', demandes);
  app.use('/api/log_modifications', log_modifications);
  app.use('/api/modification_applications', modification_application);
  app.use('/api/modification_dossiers', modification_dossier);
  app.use('/api/tasks', task);
}