const express = require('express');
const router = express.Router();
const sql = require('mssql');
const Module = require('../model/module');
const Application = require('../model/application');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const result = await Module.findAll({
            include: [
                {model: Application}
            ]
        });

        if(result.length === 0)
            res.status(404).send('No record Found!!!');

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await sql
        .query(`SELECT   [Id]
                        ,[application]
                        ,[nom]
                        ,[description]
                    FROM [task_master].[dbo].[module]
                    WHERE Id = ${req.params.id}`);

        if(result.recordsets[0].length === 0)
            res.status(404).send('No record Found for the given id!!!');

        res.send(result.recordset[0]);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;