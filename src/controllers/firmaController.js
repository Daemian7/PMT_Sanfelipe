const db = require("../db/db");

module.exports = {
    // Crear una nueva firma
    createFirma: (req, res) => {
        const { tipo_firma } = req.body;

        const query = "EXEC sp_InsertarFirma @tipo_firma = ?";
        db.query(query, [tipo_firma], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al insertar firma", details: err.message });
            }
            res.status(201).json({ message: "Firma creada", id_firma: rows[0].id_firma });
        });
    },

    // Obtener todas las firmas
    getFirmas: (req, res) => {
        const query = "EXEC sp_ObtenerFirmas";
        db.query(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener firmas", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Obtener una firma por ID
    getFirmaById: (req, res) => {
        const { id_firma } = req.params;

        const query = "EXEC sp_ObtenerFirmaPorId @id_firma = ?";
        db.query(query, [id_firma], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener firma", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ message: "Firma no encontrada" });
            }
            res.status(200).json(rows[0]);
        });
    },

    // Actualizar una firma
    updateFirma: (req, res) => {
        const { id_firma } = req.params;
        const { tipo_firma } = req.body;

        const query = "EXEC sp_ActualizarFirma @id_firma = ?, @tipo_firma = ?";
        db.query(query, [id_firma, tipo_firma], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al actualizar firma", details: err.message });
            }
            res.status(200).json({ message: rows[0].Mensaje });
        });
    },
};
