const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const { actualizarImagen } = require('../helpers/actualizar-imagen');


const upolad = (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    // validar tipo 
    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es médico, usuario u hospital'
        });
    }
    // console.log(req.files);
    // si existe el archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // procesar imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1].toLowerCase();
    // console.log(nombreCortado, extensionArchivo);

    // validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension archivo incorrecta'
        });
    }

    // generar nombre de archivo
    // = sasasasasasa.algo
    const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`;

    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'error al mover la imagen'
            });
        }
        // actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);
        res.status(200).json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        });
    });
};

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // img por defecto 
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, '../uploads/error.png');
        res.sendFile(pathImg);
    }
}

module.exports = { upolad, retornaImagen };