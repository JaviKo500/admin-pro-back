const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
            // otros items menos info sensible
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12H' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar el jwt');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = { generarJWT };