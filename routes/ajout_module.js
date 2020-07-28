const express = require('express');
const router = express.Router();
const sql = require('mssql');
const Application = require('../model/application');
const AjoutModule = require('../model/ajout_module');
const Status = require('../model/status');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const result = await AjoutModule.findAll({
            where: {
                supprime: 2
            },
            include: [
                { model: Application },
                { model: Status }
            ]
        });

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await AjoutModule.findByPk(req.params.name, {
            where: {
                supprime: 2
            },
            include: [
                { model: Application },
                { model: Status }
            ]
        })

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await AjoutModule.create(req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        req.body.modifie_par = 'concepteur';
        req.body.modifie_le = new Date();
        AjoutModule.update(
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
});

module.exports = router;