const express = require('express');
const router = express.Router();
const sql = require('mssql');
const log = require('./log-modifications');
//const db = require('../connection_db');

//db.connectToDb(sql);
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const result = await sql.query`select * from type_demande`;
        if (result.recordsets[0].length === 0)
            res.status(404).send('No type was found');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await sql.query(`select * from type_demande 
                                    where Id = ${req.params.id}`);
        if (result.recordsets[0].length === 0) res.status(404).send('The type was not found');
        res.send(result.recordset[0]);
    } catch (error) {
        res.send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await sql.query(`INSERT INTO [dbo].[type_demande]
                                        ([name]
                                        ,[description]
                                        ,[cree_par]
                                        ,[cree_le])
                                    VALUES
                                        ('${req.body.name}'
                                        ,'${req.body.description}'
                                        ,'${req.body.cree_par}'
                                        ,getdate())`);
        res.send(result);
    } catch (error) {
        res.send(error);
    }

});

router.put('/:id', async (req, res) => {
    try {
        const types = await sql.query(`select * from [dbo].[type_demande] 
                                        where Id = ${req.params.id}`);
        if (types.recordsets.length === 0) res.status(404).send('The type was not found');

        const result = await sql.query(`update [dbo].[type_demande]
                                        set name = '${req.body.name}',
                                            description = '${req.body.description}',
                                            modifier_par = '${req.body.modifie_par}',
                                            modifier_le = getdate()
                                        where Id = ${req.params.id}`);

        if (types.recordset[0].name !== req.body.name)
            log.connectToDb('type_demande', 'name', 2, types.recordset[0].name, req.body.name, req.body.modifie_par)
        //insertLog('name', types.recordset[0].name, req.body.name, req.body.modifie_par);}
        if (types.recordset[0].description !== req.body.description)
            log.connectToDb('type_demande', 'description', 2, types.recordset[0].description, req.body.description, req.body.modifie_par)
        //insertLog('description', types.recordset[0].description, req.body.description, req.body.modifie_par);   

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;