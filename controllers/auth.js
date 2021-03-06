const { response } = require('express');

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { getMemuFrontEnd } = require('../helpers/menu-forntend');
const { googleVerify } = require('../helpers/google-verify');

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
            token,
            menu: getMemuFrontEnd(usuarioBD.rol)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado login'
        });
    }
};

const googleSingIn = async(req, res = response) => {
    const googleToken = req.body.token;
    try {
        // pasmos token al helper para validar
        const { name, email, picture } = await googleVerify(googleToken);
        // verificar email
        const usuarioBD = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioBD) {
            usuario = new Usuario({ nombre: name, email, password: '@@@', img: picture, google: true });
        } else {
            // sie xiste ek usuario
            usuario = usuarioBD;
            usuarioBD.google = true;
            usuarioBD.password = '@@@';
        }
        // guardamos cambios
        await usuario.save();
        // generar jwt
        const token = await generarJWT(usuario.id);
        res.status(200).json({
            ok: true,
            msg: 'Google Sing in',
            token,
            menu: getMemuFrontEnd(usuarioBD.rol)
        });
    } catch (e) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }
}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    // generar token
    try {
        const token = await generarJWT(uid);
        const usuario = await Usuario.findById(uid);
        res.status(200).json({
            ok: true,
            token,
            usuario,
            menu: getMemuFrontEnd(usuario.rol)
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }

}

module.exports = { login, googleSingIn, renewToken };