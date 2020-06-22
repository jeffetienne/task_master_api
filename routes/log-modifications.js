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
        const result = await sql.query(`SELECT [table_modifiee]
                                            ,[champ_modifie]
                                            ,[ancienne_valeur]
                                            ,[nouvelle_valeur]
                                            ,[modifie_par]
                                            ,[modifie_le]
                                        FROM [task_master].[dbo].[log_modification]`);
        //console.log(result);
        if(result.recordsets[0].length === 0)
            res.status(404).send('No record found!');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
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

router.get('/:table', async(req, res) => {
    try {
        const result = await sql.query(`SELECT [table_modifiee]
                                            ,[champ_modifie]
                                            ,[ancienne_valeur]
                                            ,[nouvelle_valeur]
                                            ,[modifie_par]
                                            ,[modifie_le]
                                        FROM [task_master].[dbo].[log_modification] 
                                        where table_modifiee = '${req.params.table}'`);
        if(result.recordsets[0].length === 0)
            res.status(404).send('No record found for the given table');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.post('/', async(req, res) => {
    try {
        const result = sql.query(`INSERT INTO [dbo].[log_modification]
                                            ([table_modifiee]
                                            ,[champ_modifie]
                                            ,[ancienne_valeur]
                                            ,[nouvelle_valeur]
											,[modifie_par]
                                            ,[modifie_le])
                                    VALUES
                                            ('${req.body.table_modifiee}'
                                            ,'${req.body.champ_modifie}'
                                            ,'${req.body.ancienne_valeur}'
                                            ,'${req.body.nouvelle_valeur}'
											,'${req.body.modifie_par}'
											,'${req.body.modifie_le}')`);

        res.send(result);                                    
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;