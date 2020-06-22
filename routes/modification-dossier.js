const express = require('express');
const router = express.Router();
const sql = require('mssql');
const log_modification = require('../log-modification');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const result = await sql
        .query(`SELECT   [Id]
                        ,[objet]
                        ,[patient_id]
                        ,[mauvaise_info]
                        ,[bonne_info]
                        ,[sommaire]
                        ,[status]
                        ,[status_date]
                        ,[status_by]
                        ,[status_reason]
                        ,[cree_par]
                        ,[cree_le]
                        ,[modifie_par]
                        ,[modifie_le]
                    FROM [task_master].[dbo].[modification_dossier]`);

        if (result.recordsets[0].length === 0)
            res.status(404).send('No record found');

        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await sql
        .query(`SELECT   [Id]
                        ,[objet]
                        ,[patient_id]
                        ,[mauvaise_info]
                        ,[bonne_info]
                        ,[sommaire]
                        ,[status]
                        ,[status_date]
                        ,[status_by]
                        ,[status_reason]
                        ,[cree_par]
                        ,[cree_le]
                        ,[modifie_par]
                        ,[modifie_le]
                    FROM [task_master].[dbo].[modification_dossier]
                    WHERE Id = ${req.params.id}`);
                                    
        if (result.recordsets[0].length === 0)
            res.status(404).send('No record found for the given id');

        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await sql
            .query(`INSERT INTO  [dbo].[modification_dossier]
                                ([objet]
                                ,[patient_id]
                                ,[mauvaise_info]
                                ,[bonne_info]
                                ,[sommaire]
                                ,[status]
                                ,[status_date]
                                ,[status_by]
                                ,[status_reason]
                                ,[cree_par]
                                ,[cree_le])
                        VALUES
                                (${req.body.objet}
                                ,'${req.body.patient_id}'
                                ,'${req.body.mauvaise_info}'
                                ,'${req.body.bonne_info}'
                                ,'${req.body.sommaire}'
                                ,'${req.body.status}'
                                ,getdate()
                                ,'${req.body.status_by}'
                                ,'${req.body.status_reason}'
                                ,'${req.body.cree_par}'
                                ,getdate())`);

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const modifications = await sql
            .query(`SELECT   [Id]
                            ,[objet]
                            ,[patient_id]
                            ,[mauvaise_info]
                            ,[bonne_info]
                            ,[sommaire]
                            ,[status]
                            ,[status_date]
                            ,[status_by]
                            ,[status_reason]
                            ,[cree_par]
                            ,[cree_le]
                            ,[modifie_par]
                            ,[modifie_le]
                        FROM [task_master].[dbo].[modification_dossier]
                WHERE Id = ${req.params.id}`);

        if (modifications.recordsets[0].length === 0)
            res.status(404).send('No record found for the given id');

        const result = sql
            .query(`UPDATE [dbo].[modification_dossier]
                    SET [objet] = ${req.body.objet},
                    ,[patient_id] = '${req.body.patient_id}',
                    ,[mauvaise_info] = '${req.body.mauvaise_info}',
                    ,[bonne_info] = '${req.body.bonne_info}',
                    ,[sommaire] = '${req.body.sommaire}',
                    ,[status] = ${req.body.status},
                    ,[status_by] = ${req.body.status_by},
                    ,[status_date] = '${req.body.status_date}',
                    ,[status_reason] = ${req.body.status_reason},
                    ,[modifie_par] = '${req.body.modifie_par}',
                    ,[modifie_le] = getdate()
                WHERE Id = ${req.params.id}`);

        if (modifications.recordset[0].objet !== req.body.objet)
            log_modification.insertLog(sql,
                'modification_dossier',
                'objet',
                2,
                modifications.recordset[0].objet,
                req.body.objet,
                req.body.modifie_par);

        if (modifications.recordset[0].patient_id !== req.body.patient_id)
            log_modification.insertLog(sql,
                'modification_dossier',
                'patient_id',
                2,
                modifications.recordset[0].patient_id,
                req.body.patient_id,
                req.body.modifie_par);

        if (modifications.recordset[0].mauvaise_info !== req.body.mauvaise_info)
            log_modification.insertLog(sql,
                'modification_dossier',
                'mauvaise_info',
                2,
                modifications.recordset[0].mauvaise_info,
                req.body.mauvaise_info,
                req.body.modifie_par);

        if (modifications.recordset[0].bonne_info !== req.body.bonne_info)
            log_modification.insertLog(sql,
                'modification_dossier',
                'bonne_info',
                2,
                modifications.recordset[0].bonne_info,
                req.body.bonne_info,
                req.body.modifie_par);

        if (modifications.recordset[0].sommaire !== req.body.sommaire)
            log_modification.insertLog(sql,
                'modification_dossier',
                'sommaire',
                2,
                modifications.recordset[0].sommaire,
                req.body.sommaire,
                req.body.modifie_par);

        if (modifications.recordset[0].approuve !== req.body.approuve)
            log_modification.insertLog(sql,
                'modification_dossier',
                'approuve',
                2,
                modifications.recordset[0].approuve,
                req.body.approuve,
                req.body.modifie_par);

        if (modifications.recordset[0].approuve_par !== req.body.approuve_par)
            log_modification.insertLog(sql,
                'modification_dossier',
                'approuve_par',
                2,
                modifications.recordset[0].approuve_par,
                req.body.approuve_par,
                req.body.modifie_par);

        if (modifications.recordset[0].traite !== req.body.traite)
            log_modification.insertLog(sql,
                'modification_dossier',
                'traite',
                2,
                modifications.recordset[0].traite,
                req.body.traite,
                req.body.modifie_par);

        if (modifications.recordset[0].traite_par !== req.body.traite_par)
            log_modification.insertLog(sql,
                'modification_dossier',
                'traite_par',
                2,
                modifications.recordset[0].traite_par,
                req.body.traite_par,
                req.body.modifie_par);

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;