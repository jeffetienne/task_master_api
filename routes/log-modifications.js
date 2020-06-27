const express = require('express');
const router = express.Router();
const sql = require('mssql');
const log = require('../model/log-modification');
const Op = require('sequelize');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const logs = await log.findAll();
        res.send(logs);
    } catch (error) {
        console.log(error);
    }
});

/*
router.get('/:id', async(req, res) => {
    try {
        const result = await sql.query(`SELECT [table_modifiee]
                                            ,[champ_modifie]
                                            ,[ancienne_valeur]
                                            ,[nouvelle_valeur]
                                            ,[modifie_par]
                                            ,[modifie_le]
                                        FROM [task_master].[dbo].[log_modification] 
                                        where Id = ${req.params.id}`);
        if(result.recordsets[0].length === 0)
            res.status(404).send('No record found for the given id');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});//*/

router.get('/:table', async (req, res) => {
    try {
        const logs = await log.findAll({
            where: {
                table_modifiee: req.params.table
            }
        });
        res.send(logs);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = log.create(req.body);

        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;