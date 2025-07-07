const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');//permitir el acceso a las conexiones a este servidor
const authRoutes = require('./routes/auth');
require('dotenv').config(); //cargar las varibles de entorno
const reservasRoutes = require('./routes/reservas'); //importar las rutas de reservas

const app = express();
app.use(cors()); //habilito los cors
app.use(express.json()); //habilito el uso de json en las peticiones, parcer los cuerpos de los reques a json

//enrutamiento 
app.use('/api/auth', authRoutes);
app.use('/api/reservas', reservasRoutes);

//conexion y levantamiento del servidor
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoB conectado');
        app.listen(3000, () => console.log('Servidor esta corriendo en el puerto 3000'));
    })
    .catch(err => console.error(err));