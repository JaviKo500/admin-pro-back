require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./database/config');


// console.log(process.env);
// crear el servidor de express
const app = express();

// configurar cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Directorio público
app.use(express.static('public'));
// Rutas
app.use('/api/upload', require('./routes/upload'));
app.use('/api/total', require('./routes/busquedas'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospital', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'))
app.use('/api/login', require('./routes/auth'));

// lo ultimo

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en el puero ` + process.env.PORT);
});