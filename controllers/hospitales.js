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

const actualizarHospital = async(req, res = response) => {
    const hospitalId = req.params.id;
    const uid = req.uid;
    try {
        const hospitalBD = await Hospital.findById(hospitalId);
        if (!hospitalBD) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }
        const cambiosHospitales = {
            ...req.body,
            usuario: uid
        };
        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospitales, { new: true });
        res.status(200).json({
            ok: true,
            hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
};

const borrarHospital = async(req, res = response) => {
    const hospitalId = req.params.id;
    try {
        const hospitalBD = await Hospital.findById(hospitalId);
        if (!hospitalBD) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }
        await Hospital.findByIdAndDelete(hospitalId);
        res.status(200).json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
};

module.exports = { getHospitales, crearHospital, actualizarHospital, borrarHospital }