const express = require('express');
const router = express.Router();
const sql = require('mssql');
const statut = require('../model/status');
const compte = require('../model/compte');

//const connection_db = require('./connection_db');
const insert_log = require('../log-modification');
const Role = require('../model/role');
const Unite = require('../model/unite');
const Status = require('../model/status');
const Op = require('sequelize');

//connection_db.connectToDb(sql);
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const comptes = await compte.findAll({
            where: {
                supprime: 2
            },
            include: [
                { model: Role },
                { model: Unite },
                { model: Status }
            ]
        });
        res.send(comptes);
    } catch (error) {
        console.log(error);
    }

}
    /*/{
        try {
            const result = await sql.query(`SELECT [Id] 
                                                ,[demandeur]
                                                ,[date_demande]
                                                ,beneficiaire = [id_beneficiare]
                                                ,[username]
                                                ,[firstname]
                                                ,[lastname]
                                                ,[role]
                                                ,[unite]
                                                ,[forme_par]
                                                ,[status]
                                                ,[status_date]
                                                ,[status_by]
                                                ,[status_reason]
                                                ,[cree_par]
                                                ,[cree_le]
                                                ,[modifie_par]
                                                ,[modifie_le]
                                            FROM [task_master].[dbo].[creation_compte]`);
            if (result.recordsets[0].length === 0)
                res.status(404).send('No result was found for demande!!!');
            res.send(result.recordset);
        } catch (error) {
            res.send(error);
        }
    }//*/
);

router.get('/:id', async (req, res) => {
    try {

        /*
        const result = await sql.query(`SELECT [Id] 
											,[demandeur]
                                            ,[date_demande]
                                            ,beneficiaire = [id_beneficiare]
                                            ,[username]
                                            ,[firstname]
                                            ,[lastname]
                                            ,[role]
                                            ,[unite]
                                            ,[forme_par]
                                            ,[status]
                                            ,[status_date]
                                            ,[status_by]
                                            ,[status_reason]
                                            ,[cree_par]
                                            ,[cree_le]
                                            ,[modifie_par]
                                            ,[modifie_le]
                                        FROM [task_master].[dbo].[creation_compte] 
                                        WHERE Id = ${req.params.id}`);
                                        //*/
        const result = await compte.findByPk(req.params.id, {
            include: [
                { model: Role },
                { model: Unite },
                { model: Status }
            ]
        });

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id_beneficiaire/:username', async (req, res) => {
    try {
        const result = await compte.findAll(
            {
                where: Op.or(
                    { id_beneficiaire: req.params.id_beneficiaire },
                    { username: req.params.username }
                ),

                include: [
                    { model: Role },
                    { model: Unite },
                    { model: Status }
                ]
            });

        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        /*
        const result = await sql.query(`INSERT INTO [dbo].[creation_compte]
                                                    ([demandeur]
                                                    ,[date_demande]
                                                    ,[id_beneficiare]
                                                    ,[username]
                                                    ,[firstname]
                                                    ,[lastname]
                                                    ,[role]
                                                    ,[unite]
                                                    ,[forme_par]
                                                    ,[status]
                                                    ,[status_date]
                                                    ,[status_by]
                                                    ,[status_reason]
                                                    ,[cree_par]
                                                    ,[cree_le])
                                        VALUES
                                                ('${req.body.demandeur}'
                                                ,'${req.body.date_demande}'
                                                ,'${req.body.beneficiaire}'
                                                ,'${req.body.username}'
                                                ,'${req.body.firstname}'
                                                ,'${req.body.lastname}'
                                                ,'${req.body.role}'
                                                ,'${req.body.unite}'
                                                ,'${req.body.forme_par}'
                                                ,'${req.body.status}'
                                                ,getdate()
                                                ,'${req.body.status_by}'
                                                ,'${req.body.status_reason}'
                                                ,'${req.body.cree_par}'
                                                ,getdate())`);
        /*/
        //req.body.date_demande = req.body.date_demande.toISOString();
        //req.body.status_date = req.body.status_date.toISOString();
        //req.body.cree_le = req.body.cree_le.toISOString();

        const result = await compte.create(req.body);//*/
        res.send(result);
    } catch (error) {
        //console.log(error);
        console.log(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        req.body.modifie_par = 'concepteur';
        req.body.modifie_le = new Date();
        compte.update(
            req.body,
            { where: { Id: req.params.id } }
        )
            .then(function (rowsUpdated) {
                res.json(rowsUpdated)
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }

    /*
    try {
        const result = await sql.query(`SELECT [Id] 
											,[demandeur]
                                            ,[date_demande]
                                            ,beneficiaire = [id_beneficiare]
                                            ,[username]
                                            ,[firstname]
                                            ,[lastname]
                                            ,[role]
                                            ,[unite]
                                            ,[forme_par]
                                            ,[status]
                                            ,[status_date]
                                            ,[status_by]
                                            ,[status_reason]
                                            ,[cree_par]
                                            ,[cree_le]
                                            ,[modifie_par]
                                            ,[modifie_le]
                                        FROM [task_master].[dbo].[creation_compte] 
                                        WHERE Id = ${req.params.id}`);
        if (result.recordsets[0].length === 0)
            res.status(404).send('No result was found for this id!!!');

        const resultat = await sql.query(`update [task_master].[dbo].[creation_compte]
											set id_beneficiare = '${req.body.beneficiaire}'
											,username = '${req.body.username}'
											,firstname = '${req.body.firstname}'
											,lastname = '${req.body.lastname}'
											,role = '${req.body.role}'
											,unite = '${req.body.unite}'
											,forme_par ='${req.body.forme_par}'
											,modifie_par = '${req.body.modifie_par}'
											,modifie_le = getDate()
										  WHERE Id = ${req.params.id}`);

        res.send(resultat);
    } catch (error) {
        res.send(error);
    }
    //*/
});

module.exports = router;