// File: models/Usuario.js
//crear modelos en conlecciones dentro de la base de datos--ir a usuarios
const mongoose = require('mongoose');

//definir el esquema dde los datos en la coleccion usuario
const usuarioSchema = new mongoose.Schema({
    correo: String,
    contraseña: String,
});

//exportar el modelo para usar en otras clases
module.exports = mongoose.model('Usuario', usuarioSchema); // toma toda la estrucutura q crea las colleciones en la bd 