const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {
    // populate para estrucuturar un objeto
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');
    res.json({
        ok: true,
        medicos
    });
};

const crearMedico = async(req, res = response) => {
    // id del usuario
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        const medicoBD = await medico.save();
        res.status(200).json({
            ok: true,
            medicoBD
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
};

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'put medico'
    });
};

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrar medico'
    });
};

module.exports = { getMedicos, crearMedico, actualizarMedico, borrarMedico };