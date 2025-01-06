const db = require("../db/db");

module.exports = {
    // Crear un nuevo artículo
    createArticulo: (req, res) => {
        const { numero_artic, detalle } = req.body;

        const query = "EXEC sp_InsertArticulo @numero_artic = ?, @detalle = ?";
        db.query(query, [numero_artic, detalle], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al insertar artículo", details: err.message });
            }
            res.status(201).json({ message: "Artículo creado", newArticuloId: rows[0].NewArticuloId });
        });
    },

    // Obtener todos los artículos
    getArticulos: (req, res) => {
        const query = "EXEC sp_GetArticulos";
        db.query(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener artículos", details: err.message });
            }
            res.status(200).json(rows);
        });
    },

    // Obtener un artículo por ID
    getArticuloById: (req, res) => {
        const { id_artic } = req.params;

        const query = "EXEC sp_GetArticuloById @id_artic = ?";
        db.query(query, [id_artic], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener artículo", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ message: "Artículo no encontrado" });
            }
            res.status(200).json(rows[0]);
        });
    },

    // Actualizar un artículo
    updateArticulo: (req, res) => {
        const { id_artic } = req.params;
        const { numero_artic, detalle } = req.body;

        const query = "EXEC sp_UpdateArticulo @id_artic = ?, @numero_artic = ?, @detalle = ?";
        db.query(query, [id_artic, numero_artic, detalle], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Artículo no encontrado" });
                }
                return res.status(500).json({ error: "Error al actualizar artículo", details: err.message });
            }
            res.status(200).json({ message: "Artículo actualizado" });
        });
    },

    // Eliminar un artículo
    deleteArticulo: (req, res) => {
        const { id_artic } = req.params;

        const query = "EXEC sp_DeleteArticulo @id_artic = ?";
        db.query(query, [id_artic], (err) => {
            if (err) {
                if (err.message.includes("No se encontró")) {
                    return res.status(404).json({ error: "Artículo no encontrado" });
                }
                return res.status(500).json({ error: "Error al eliminar artículo", details: err.message });
            }
            res.status(200).json({ message: "Artículo eliminado" });
        });
    },
};
