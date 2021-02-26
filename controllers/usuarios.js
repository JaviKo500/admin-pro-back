const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');




const getUsuarios = async(req, res = response) => {
    const desde = Number(req.query.desde) || 0;
    // console.log(desde);
    /* const usuarios = await Usuario
    .find({}, 'nombre email rol google')
    .skip(desde)
    .limit(5);
    const total = await Usuario.count();*/
    //  PAGINAR USUARIOS
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),
        Usuario.countDocuments()
    ]);
    res.json({
        ok: true,
        usuarios,
        uid: req.uid,
        total
    });
};
const crearUsuarios = async(req, res = response) => {
    const { password, email } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya registrado'
            });
        }
        const usuario = new Usuario(req.body);
        // encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // graba en la bd
        await usuario.save();
        // token
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};
const actualizarUsuarios = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioBD = await Usuario.findById(uid);
        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        // actualizaciones 
        const { password, google, email, ...campos } = req.body;
        if (usuarioBD.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email '
                });
            }
        }

        if (!usuarioBD.google) {
            campos.email = email;
        } else if (usuarioBD.email !== email) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuarios de google no puede cambiar su usuario'
            });
        }
        // elimina campos de un objeto
        // delete campos.password;
        // delete campos.google;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};
const eliminarUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioBD = await Usuario.findById(uid);
        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al eliminar'
        });
    }
};
module.exports = { getUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuario };