const mongoose = require('mongoose');
require('dotenv').config();

// user: javiko            javiko500
// pass: unD4rY7WeEyUEsRM  lVsyXXyPes541Nn1 
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('bd online');
    } catch (error) {
        console.log(error);
        throw new Error(' Error a  la hora de iniciar la coneccion a la bd');
    }
}

module.exports = {
    dbConnection
}