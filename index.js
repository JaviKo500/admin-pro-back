require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// console.log(process.env);
// crear el servidor de express
const app = express();

// configurar cors
app.use(cors());
// Base de datos
dbConnection();

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Hola mundo'
    });
});
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en el puero ` + process.env.PORT);
});