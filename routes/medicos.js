/*
    ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();

router.get('/', [validarJWT], getMedicos);
router.post('/', [
        validarJWT,
        check('nombre', 'Nombre de medico es obligatorio').not().isEmpty(),
        check('hospital', 'Hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);
router.put('/:id', [validarJWT], actualizarMedico);
router.delete('/:id', [validarJWT], borrarMedico);

module.exports = router;