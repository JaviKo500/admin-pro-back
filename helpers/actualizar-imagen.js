const fs = require('fs');
const Usuarios = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            let medico;
            try {
                medico = await Medico.findById(id);
            } catch (e) {
                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            break;
        case 'hospitales':
            let hospital;
            try {
                hospital = await Hospital.findById(id);
            } catch (e) {
                console.log('no existe ese hospital');
                return false;
            }
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);
            hospital.img = nombreArchivo;
            await hospital.save();
            break;
        case 'usuarios':
            let usuario;
            try {
                usuario = await Usuarios.findById(id);
            } catch (e) {
                console.log('no existe ese usuario');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();
            break;
        default:
            break;
    }
};

module.exports = { actualizarImagen }