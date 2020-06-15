const express = require('express');
const router = express.Router();
const sql = require('mssql');
const log = require('../log-modification');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const result = await sql.query('select * from modification_application');
        if(result.recordsets[0].length === 0)
            res.status(404).send('No record found');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }   
});

router.get('/:id', async (req, res) => {
    try {
        const result = await sql.query(`select * 
                                        from modification_application 
                                        where Id = ${req.params.id}`);
        if(result.recordsets[0].length === 0)
            result.status(404).send('No record found for the given Id');
        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await sql.query(`INSERT INTO [dbo].[modification_application]
                                                ([module]
                                                ,[sommaire]
                                                ,[cree_par]
                                                ,[cree_le])
                                            VALUES
                                                (${req.body.application}
                                                ,${req.body.module}
                                                ,'${req.body.sommaire}'
                                                ,'${req.body.cree_par}'
                                                ,getdate())`);
        res.send(result);
    } catch (error) {
        res.send(error.name + ' : ' + error.originalError.info.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const modifications = await sql.query(`select * 
                                            from modification_application 
                                            where Id = ${req.params.id}`);
        
        if(modifications.recordsets[0].length === 0) 
            res.status(404).send('No record found for the given id');
        console.log(req);
        const result = await sql.query(`update modification_application
                                        set application = ${req.body.application},
                                        module = ${req.body.module},
                                        sommaire = '${req.body.sommaire}',
                                        modifie_par = '${req.body.modifie_par}',
                                        modifie_le = getdate()`);

        if(modifications.recordset[0].application !== req.body.application)
            log.insertLog(sql, 
                            'modification_application', 
                            'application', 
                            2, 
                            modifications.recordset[0].application, 
                            req.body.application, 
                            req.body.modifie_par); 
        
        if(modifications.recordset[0].module !== req.body.module)
            log.insertLog(sql, 
                            'modification_application', 
                            'module', 
                            2, 
                            modifications.recordset[0].module, 
                            req.body.module, 
                            req.body.modifie_par);

        if(modifications.recordset[0].sommaire !== req.body.sommaire)
            log.insertLog(sql, 
                            'modification_application', 
                            'sommaire', 
                            2, 
                            modifications.recordset[0].sommaire, 
                            req.body.sommaire, 
                            req.body.modifie_par);

        res.send(result);
    } catch (error) {
        res.send(error);
    }    
});

module.exports = router;