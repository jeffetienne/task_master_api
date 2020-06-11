const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', async (req, res) => {
    try {
        const result = await sql.query(`select * from log_modification`);
        //console.log(result);
        if(result.recordsets[0].length === 0)
            res.status(404).send('No record found!');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const result = await sql.query(`select * from log_modification where Id = ${req.params.id}`);
        if(result.recordsets[0].length === 0)
            res.status(404).send('No record found for the given id');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:table/:action', async(req, res) => {
    try {
        const result = await sql.query(`select * from log_modification where table_modifiee = '${req.params.table}' and action = ${req.params.action}`);
        if(result.recordsets[0].length === 0)
            res.status(404).send('No record found for the given table');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;