//File: models/Reserva.js
const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    //reserva hecha por el usuario, obtener por id
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}, // hacer referencia al modelo Usuario
        fecha: String, // fecha de la reserva
        sala: String, // sala reservada
        hora: String, // hora de la reserva
});

module.exports = mongoose.model('Reserva', reservaSchema); // exportar el modelo Reserva para usar en otras clases