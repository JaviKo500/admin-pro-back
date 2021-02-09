const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre');
    res.json({
        ok: true,
        hospitales
    });
};

const crearHospital = async(req, res = response) => {
    // pasamos los datos del request
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    console.log(req);
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospitalDB
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }

};

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizar hospital'
    });
};

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrar usuario'
    });
};

module.exports = { getHospitales, crearHospital, actualizarHospital, borrarHospital }