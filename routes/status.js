const express = require('express');
const router = express.Router();
const sql = require('mssql');
const Status = require('../model/status');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const result = await Status.findAll();

        if(result.length === 0)
            res.status(404).send('No record Found!!!');

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await Status.findByPk(req.params.id);

        if(!result)
            res.status(404).send('No record Found for the given id!!!');

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;