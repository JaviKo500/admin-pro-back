/*
    ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRole, validarAdminRoleoMism_o_Usuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post(
    '/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El  email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuarios
);
router.put(
    '/:id', [
        validarJWT,
        validarAdminRoleoMism_o_Usuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El  email es obligatorio').isEmail(),
        check('rol', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuarios
);
router.delete('/:id', [validarJWT, validarAdminRole], eliminarUsuario);


module.exports = router;