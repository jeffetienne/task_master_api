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
        const result = await sql
            .query(`SELECT [Id]
                    ,[objet]
                    ,[demande]
                    ,[assign_to]
                    ,[assign_date]
                    ,[deadline]
                    ,[priority]
                    ,[status]
                    ,[status_date]
                    ,[status_by]
                    ,[cree_par]
                    ,[cree_le]
                    ,[modifie_par]
                    ,[modifie_le]
                FROM [dbo].[tache]`);

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
            .query(`SELECT [Id]
                    ,[objet]
                    ,[demande]
                    ,[assign_to]
                    ,[assign_date]
                    ,[deadline]
                    ,[priority]
                    ,[status]
                    ,[status_date]
                    ,[status_by]
                    ,[cree_par]
                    ,[cree_le]
                    ,[modifie_par]
                    ,[modifie_le]
                FROM [dbo].[tache]
                WHERE Id = ${req.params.id}`);

        if (result.recordsets[0].length === 0)
            res.status(404).send('No record found');

        res.send(result.recordset);
    } catch (error) {
        res.send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await sql
            .query(`INSERT INTO [dbo].[tache]
                            ([objet]
                            ,[demande]
                            ,[assign_to]
                            ,[assign_date]
                            ,[deadline]
                            ,[priority]
                            ,[status]
                            ,[status_date]
                            ,[status_by]
                            ,[cree_par]
                            ,[cree_le])
                    VALUES
                            (${req.body.objet}
                            ,${req.body.demande}
                            ,${req.body.assign_to}
                            ,'${req.body.assign_date}'
                            ,'${req.body.deadline}'
                            ,${req.body.priority}
                            ,${req.body.status}
                            ,'${req.body.status_date}'
                            ,${req.body.status_by}
                            ,'${req.body.cree_par}'
                            ,getdate())`);

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const tasks = await sql
            .query(`SELECT [Id]
                    ,[objet]
                    ,[demande]
                    ,[assign_to]
                    ,[assign_date]
                    ,[deadline]
                    ,[priority]
                    ,[status]
                    ,[status_date]
                    ,[status_by]
                    ,[cree_par]
                    ,[cree_le]
                    ,[modifie_par]
                    ,[modifie_le]
                FROM [dbo].[tache]
                WHERE Id = ${req.params.id}`)

        if (tasks.recordsets[0].length === 0)
            res.status(404).send('No record found for the given id');

        const result = sql
            .query(`UPDATE [dbo].[tache]
                        SET [objet] = ${req.body.objet}
                        ,[demande] = ${req.body.demande}
                        ,[assign_to] = ${req.body.assign_to}
                        ,[assign_date] = '${req.body.assign_date}'
                        ,[deadline] = '${req.body.deadline}'
                        ,[priority] = ${req.body.priority}
                        ,[status] = ${req.body.status}
                        ,[status_date] = '${req.body.status_date}'
                        ,[status_by] = ${req.body.status_by}
                        ,[modifie_par] = '${req.body.modifie_par}'
                        ,[modifie_le] = getdate()
                    WHERE Id = ${req.params.id}`);

        if (tasks.recordset[0].objet !== req.body.objet)
            log.insertLog(sql,
                'tache',
                'objet',
                2,
                tasks.recordset[0].objet,
                req.body.objet,
                req.body.modifie_par);

        if (tasks.recordset[0].demande !== req.body.demande)
            log.insertLog(sql,
                'tache',
                'objet',
                2,
                tasks.recordset[0].demande,
                req.body.demande,
                req.body.modifie_par);

        if (tasks.recordset[0].assign_to !== req.body.assign_to)
            log.insertLog(sql,
                'tache',
                'assign_to',
                2,
                tasks.recordset[0].assign_to,
                req.body.assign_to,
                req.body.modifie_par);

        if (tasks.recordset[0].assign_date !== req.body.assign_date)
            log.insertLog(sql,
                'tache',
                'assign_date',
                2,
                tasks.recordset[0].assign_date,
                req.body.assign_date,
                req.body.modifie_par);

        if (tasks.recordset[0].assign_date !== req.body.assign_date)
            log.insertLog(sql,
                'tache',
                'assign_date',
                2,
                tasks.recordset[0].assign_date,
                req.body.assign_date,
                req.body.modifie_par);

        if (tasks.recordset[0].deadline !== req.body.deadline)
            log.insertLog(sql,
                'tache',
                'deadline',
                2,
                tasks.recordset[0].deadline,
                req.body.deadline,
                req.body.modifie_par);

        if (tasks.recordset[0].priority !== req.body.priority)
            log.insertLog(sql,
                'tache',
                'priority',
                2,
                tasks.recordset[0].priority,
                req.body.priority,
                req.body.modifie_par);

        if (tasks.recordset[0].status !== req.body.status)
            log.insertLog(sql,
                'tache',
                'status',
                2,
                tasks.recordset[0].status,
                req.body.status,
                req.body.modifie_par);

        if (tasks.recordset[0].status_date !== req.body.status_date)
            log.insertLog(sql,
                'tache',
                'status_date',
                2,
                tasks.recordset[0].status_date,
                req.body.status_date,
                req.body.modifie_par);

        if (tasks.recordset[0].status_by !== req.body.status_by)
            log.insertLog(sql,
                'tache',
                'status_by',
                2,
                tasks.recordset[0].status_by,
                req.body.status_by,
                req.body.modifie_par);

    } catch (error) {
        res.send(error);
    }
});

module.exports = router;