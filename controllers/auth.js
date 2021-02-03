const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuarioBD = await Usuario.findOne({ email });
        // verificar email
        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        // verificar password
        const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no es valida'
            });
        }
        // llamamos el metodo de generar el token
        const token = await generarJWT(usuarioBD.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado login'
        });
    }
};

module.exports = { login };