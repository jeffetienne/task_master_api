const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const result = await sql
        .query(`SELECT   [Id]
                        ,[application]
                        ,[module]
                        ,[sommaire]
                        ,[status]
                        ,[status_date]
                        ,[status_by]
                        ,[status_reason]
                        ,[cree_par]
                        ,[cree_le]
                        ,[modifie_par]
                        ,[modifie_le]
                    FROM [task_master].[dbo].[plainte]`);

        if(result.recordsets[0].length === 0)
            res.status(404).send('No record Found!!!');

        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await sql
        .query(`SELECT   [Id]
                        ,[application]
                        ,[module]
                        ,[sommaire]
                        ,[status]
                        ,[status_date]
                        ,[status_by]
                        ,[status_reason]
                        ,[cree_par]
                        ,[cree_le]
                        ,[modifie_par]
                        ,[modifie_le]
                    FROM [task_master].[dbo].[plainte]
                    WHERE Id = ${req.params.id}`);

        if(result.recordsets[0].length === 0)
            res.status(404).send('No record Found for the given id!!!');

        res.send(result.recordset[0]);
    } catch (error) {
        res.send(error);
    }
});

router.post('/', (req, res) => {
    try {
        const result = await sql
        .query(`INSERT INTO  [dbo].[plainte]
                            ([application]
                            ,[module]
                            ,[sommaire]
                            ,[status]
                            ,[status_date]
                            ,[status_by]
                            ,[status_reason]
                            ,[cree_par]
                            ,[cree_le])
                    VALUES
                            (${req.body.application}
                            ,'${req.body.module}'
                            ,'${req.body.sommaire}'
                            ,'${req.body.status}'
                            ,getdate()
                            ,'${req.body.status_by}'
                            ,'${req.body.status_reason}'
                            ,'${req.body.cree_par}'
                            ,getdate()))`);
    } catch (error) {
        res.send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const plainte = await sql
        .query(`SELECT   [Id]
                        ,[application]
                        ,[module]
                        ,[sommaire]
                        ,[status]
                        ,[status_date]
                        ,[status_by]
                        ,[status_reason]
                        ,[cree_par]
                        ,[cree_le]
                        ,[modifie_par]
                        ,[modifie_le]
                    FROM [task_master].[dbo].[plainte]
                    WHERE Id = ${req.params.id}`);

        if(plainte.recordsets[0].length === 0)
            res.status(404).send('No record Found for the given id!!!');

        const result = await sql
        .query(`update modification_application
                    set application = ${req.body.application},
                    module = ${req.body.module},
                    sommaire = '${req.body.sommaire}',
                    status = ${req.body.status},
                    status_by = ${req.body.status_by},
                    status_date = '${req.body.status_date}',
                    status_reason = '${req.body.status_reason}',
                    modifie_par = '${req.body.modifie_par}',
                    modifie_le = getdate()
                WHERE Id = ${req.params.id}`);

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;