const express = require('express');
const router = express.Router();
const sql = require('mssql');

//const connection_db = require('./connection_db');
const insert_log = require('../log-modification');

//connection_db.connectToDb(sql);

router.get('/', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM [dbo].[demande]');
        if(result.recordsets[0].length === 0) 
            res.status(404).send('No result was found for demande!!!');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await sql.query(`SELECT * FROM demande WHERE Id = ${req.params.id}`);
        if (result.recordsets[0].length === 0)
            res.status(404).send('No result was found for this id!!!');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.post('/', async(req, res) => {
    try {
        const result = await sql.query(`INSERT INTO [dbo].[demande]
                                                ([type_demande]
                                                ,[demandeur]
                                                ,[date_demande]
                                                ,[id_beneficiare]
                                                ,[username]
                                                ,[firstname]
                                                ,[lastname]
                                                ,[role]
                                                ,[unite]
                                                ,[forme_par]
                                                ,[cree_par]
                                                ,[cree_le])
                                        VALUES
                                                ('${req.body.type_demande}'
                                                ,'${req.body.demandeur}'
                                                ,'${req.body.date_demande}'
                                                ,'${req.body.beneficiaire}'
                                                ,'${req.body.username}'
                                                ,'${req.body.firstname}'
                                                ,'${req.body.lastname}'
                                                ,'${req.body.role}'
                                                ,'${req.body.unite}'
                                                ,'${req.body.forme_par}'
                                                ,'${req.body.cree_par}'
                                                ,getdate())`);
        try {
            result = insert_log.insertLog(sql, 'demande', 
                            'username', 2, 'jeetic', 'jeffetienne', req.body.cree_par);   
            console.log(result);
        } catch (error) {
            res.send(error)
        }

        //res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router