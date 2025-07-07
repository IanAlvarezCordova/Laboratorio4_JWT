const express = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Función para validar formato de correo
function esCorreoValido(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

// Endpoint para registrar usuarios
router.post('/register', async (req, res) => {
    const { correo, contraseña } = req.body;

    // Validaciones básicas
    if (!correo || !contraseña) {
        return res.status(400).json({ msg: 'Correo y contraseña son obligatorios' });
    }

    if (!esCorreoValido(correo)) {
        return res.status(400).json({ msg: 'Formato de correo inválido' });
    }

    // Verificar si ya existe un usuario con ese correo
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) {
        return res.status(409).json({ msg: 'El correo ya está registrado' });
    }

    try {
        const hashed = await bcrypt.hash(contraseña, 10);
        const nuevoUsuario = new Usuario({ correo, contraseña: hashed });
        await nuevoUsuario.save();

        res.status(201).json({ msg: 'Usuario creado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

// Endpoint para login
router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ msg: 'Correo y contraseña son obligatorios' });
    }

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

        const valido = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!valido) return res.status(401).json({ msg: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;
