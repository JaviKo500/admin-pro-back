/*
api: /api/total/:buscar
*/
const { Router } = require('express');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:buscar', validarJWT, getTodo);
router.get('/coleccion/:tabla/:buscar', validarJWT, getDocumentosColeccion);

module.exports = router;