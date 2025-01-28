const db = require("../db/db");

module.exports = {
    // Crear un nuevo detalle de multa
    createMultaDetalle: (req, res) => {
        const { id_multa, id_articulo } = req.body;

        const query = "EXEC sp_InsertMultaDetalle @id_multa = ?, @id_articulo = ?";
        db.query(query, [id_multa, id_articulo], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al insertar detalle de multa", details: err.message });
            }
            res.status(201).json({ 
                message: "Detalle de multa creado", 
                newDetalleId: rows[0]?.NewDetalleId || null // Devuelve el ID del nuevo detalle, si lo hay
            });
        });
    },

    // Obtener todos los detalles de multas
    getMultaDetalles: (req, res) => {
        const query = "EXEC sp_GetMultaDetalles";
        db.query(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener detalles de multas", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Obtener un detalle de multa por ID
    getMultaDetalleById: (req, res) => {
        const { id_detalle } = req.params;

        const query = "EXEC sp_GetMultaDetalleById @id_detalle = ?";
        db.query(query, [id_detalle], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener detalle de multa", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ message: "Detalle de multa no encontrado" });
            }
            res.status(200).json(rows[0]);
        });
    },

    // Actualizar un detalle de multa
    updateMultaDetalle: (req, res) => {
        const { id_detalle } = req.params;
        const { id_multa, id_articulo } = req.body;

        const query = "EXEC sp_UpdateMultaDetalle @id_detalle = ?, @id_multa = ?, @id_articulo = ?";
        db.query(query, [id_detalle, id_multa, id_articulo], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Detalle de multa no encontrado" });
                }
                return res.status(500).json({ error: "Error al actualizar detalle de multa", details: err.message });
            }
            res.status(200).json({ message: "Detalle de multa actualizado" });
        });
    },

};
