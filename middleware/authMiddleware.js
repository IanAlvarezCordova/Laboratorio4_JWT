//File: middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No Autorizado: token faltante o inválido' });
    }

    const token = authHeader.split(" ")[1]; // ✅ CORRECTO

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Guardar el ID del usuario en la solicitud
        next();
    } catch (err) {
        return res.status(403).json({ msg: 'Token invalido' });
    }
}

module.exports = authMiddleware;
