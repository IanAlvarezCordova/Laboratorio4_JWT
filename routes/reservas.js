const express = require('express');
const Reserva = require('../models/Reserva');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
// Middleware para verificar autenticación
router.use(authMiddleware);
// Endpoint para crear una reserva
router.post('/', async (req, res) => {
    const { fecha, sala, hora } = req.body;

    // Validaciones básicas
    if (!fecha || !sala || !hora) {
        return res.status(400).json({ msg: 'Fecha, sala y hora son obligatorios' });
    }

    try {
        const nuevaReserva = new Reserva({
            usuario: req.userId,
            fecha,
            sala,
            hora
        });

        await nuevaReserva.save();
        res.status(201).json(nuevaReserva);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
}
);
// Endpoint para obtener reservas del usuario autenticado
router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.find({ usuario: req.userId })
        res.json(reservas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
}
);
// Endpoint para cancelar/eliminar una reserva (solo si pertenece al usuario autenticado)
router.delete('/:id', async (req, res) => {
    const resultado = await Reserva.deleteOne({_id: req.params.id, usuario: req.userId});
    //Si no se elimino porque no era su reserva o no existia
    if (resultado.deletedCount === 0) {
        return res.status(404).json({ msg: 'Reserva no encontrada o no pertenece al usuario' });
    }

    res.status(200).json({ msg: 'Reserva cancelada' });
}
); 
// Exportar el router
module.exports = router;
// File: routes/reservas.js
