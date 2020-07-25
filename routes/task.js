const express = require('express');
const router = express.Router();
const sql = require('mssql');
const tache = require('../model/task');
const Objet = require('../model/objet');
const Priority = require('../model/priority');
const Status = require('../model/status');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', async (req, res) => {
    try {
        const result = await tache.findAll({
            include: [
                { model: Objet },
                { model: Priority },
                { model: Status }
            ]
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await tache.findByPk(req.params.id, {
            include: [
                { model: Objet },
                { model: Priority },
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
        const result = await tache.create(req.body);

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        req.body.modifie_par = 'concepteur';
        req.body.modifie_le = new Date();
        tache.update(
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