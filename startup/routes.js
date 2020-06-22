const express = require('express');
const applications = require('../routes/application');
const modules = require('../routes/module');
const objets = require('../routes/objet');
const priorities = require('../routes/priority');
const types = require('../routes/type-demande');
const roles = require('../routes/role');
const status = require('../routes/status');
const unites = require('../routes/unite');
const creation_compte = require('../routes/creation_compte');
const log_modifications = require('../routes/log-modifications');
const modification_application = require('../routes/modification-application');
const modification_dossier = require('../routes/modification-dossier');
const task = require('../routes/task');
const cors = require('cors');

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  app.use('/api/applications', applications);
  app.use('/api/modules', modules);
  app.use('/api/objets', objets);
  app.use('/api/priorities', priorities);
  app.use('/api/types', types);
  app.use('/api/roles', roles);
  app.use('/api/status', status);
  app.use('/api/unites', unites);
  app.use('/api/creation_comptes', creation_compte);
  app.use('/api/log_modifications', log_modifications);
  app.use('/api/modification_applications', modification_application);
  app.use('/api/modification_dossiers', modification_dossier);
  app.use('/api/tasks', task);
}