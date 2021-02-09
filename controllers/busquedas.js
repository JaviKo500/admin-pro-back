const { response } = require('express');
const Usuarios = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) => {
    const buscar = req.params.buscar;
    const regex = new RegExp(buscar, 'i');
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuarios.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);
    res.status(200).json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
};

const getDocumentosColeccion = async(req, res = response) => {
    const tabla = req.params.tabla;
    const buscar = req.params.buscar;
    const regex = new RegExp(buscar, 'i');
    let data = [];
    switch (tabla) {
        case 'usuarios':
            data = await Usuarios.find({ nombre: regex });
            break;
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuarios', 'nombre')
                .populate('medico', 'nombre');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuarios', 'nombre')
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }
    res.status(200).json({
        ok: true,
        resultado: data
    });

};

module.exports = { getTodo, getDocumentosColeccion };