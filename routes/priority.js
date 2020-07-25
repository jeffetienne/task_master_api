const express = require('express');
const router = express.Router();
const sql = require('mssql');
const Priority = require('../model/priority');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const result = await Priority.findAll({
            order: [
                ['description', 'ASC']
            ]
        })
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:name', async (req, res) => {
    try {
        const result = await Priority.findByPk(req.params.name);

        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;