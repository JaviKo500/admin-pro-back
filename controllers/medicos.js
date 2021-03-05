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
const getMedico = async(req, res = response) => {
    // populate para estrucuturar un objeto
    const id = req.params.id;
    try {
        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');
        res.status(200).json({
            ok: true,
            medico
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
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

const actualizarMedico = async(req, res = response) => {
    const medicoId = req.params.id;
    const uid = req.uid;
    try {
        const medicoBD = await Medico.findById(medicoId);
        if (!medicoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }
        const cambiosMedicos = {
            ...req.body,
            usuario: uid
        };
        const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambiosMedicos, { new: true });
        res.status(200).json({
            ok: true,
            medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
};

const borrarMedico = async(req, res = response) => {
    const medicoId = req.params.id;
    try {
        const medicoBD = await Medico.findById(medicoId);
        if (!medicoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }
        await Medico.findByIdAndDelete(medicoId);
        res.status(200).json({
            ok: true,
            msg: 'Medico borrado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
};

module.exports = { getMedicos, getMedico, crearMedico, actualizarMedico, borrarMedico };