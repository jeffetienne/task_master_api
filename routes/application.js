const express = require('express');
const router = express.Router();
const sql = require('mssql');
const Application = require('../model/application');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const result = await Application.findAll();

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:name', async (req, res) => {
    try {
        const result = await Application.findByPk(req.params.name)

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;