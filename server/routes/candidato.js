const express = require('express')

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Candidato = require('../models/candidato');
const app = express()

app.get('/candidatos', function (req, res){

        Candidato.find()
        .exec((err, candidatos) =>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            Candidato.count((err, conteo) => {

                res.json({
                    ok: true,
                    candidatos,
                    cuantos: conteo
                });
            });
        });
});

app.post('/candidato', function (req, res) {
    
    let body = req.body;

    let candidato = new Candidato({
        name: body.name,
        tel: body.tel,
        email: body.email,
        englishLevel: body.englishLevel,
        wageAspiration: body.wageAspiration,
        interviewer: body.interviewer,
        project: body.project,
        client: body.client,
        cv: body.cv,
        technicalLeader: body.technicalLeader
    });

    candidato.save((err, candidatoDB) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            candidato: candidatoDB
        });
    });
});

app.put('/candidato/:id', function(req, res) {
    let id = req.params.id;

    let body = req.body;

    Candidato.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, candidatoDB) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            candidato: candidatoDB
        });
    });
});

module.exports = app;