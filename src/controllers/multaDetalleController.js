const db = require("../db/db");

// Obtener todos los detalles de una multa
const getDetallesByMultaId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "SELECT md.id_detalle, md.id_multa, md.id_articulo, a.detalle, a.precio " +
            "FROM multa_detalle md " +
            "JOIN articulos a ON md.id_articulo = a.id_artic " +
            "WHERE md.id_multa = ?",
            [id]
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Agregar un detalle a una multa
const createDetalle = async (req, res) => {
    const { id } = req.params; // ID de la multa
    const { id_articulo } = req.body; // ID del artículo
    try {
        // 1. Insertar el detalle en la tabla multa_detalle
        await db.query(
            "INSERT INTO multa_detalle (id_multa, id_articulo) VALUES (?, ?)",
            [id, id_articulo]
        );

        // 2. Actualizar el total en la tabla multa
        await db.query(
            `UPDATE multa
             SET total = (
                 SELECT SUM(a.precio)
                 FROM multa_detalle md
                 JOIN articulos a ON md.id_articulo = a.id_artic
                 WHERE md.id_multa = multa.id_multa
             )
             WHERE id_multa = ?`,
            [id]
        );

        res.status(201).json({ success: true, message: "Detalle creado y total actualizado" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Actualizar un detalle específico
const updateDetalle = async (req, res) => {
    const { id, id_detalle } = req.params;
    const { id_articulo } = req.body;
    try {
        // Actualizar el detalle
        const [result] = await db.query(
            "UPDATE multa_detalle SET id_articulo = ? WHERE id_multa = ? AND id_detalle = ?",
            [id_articulo, id, id_detalle]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ success: false, message: "Detalle no encontrado" });

        // Actualizar el total en la tabla multa
        await db.query(
            `UPDATE multa
             SET total = (
                 SELECT SUM(a.precio)
                 FROM multa_detalle md
                 JOIN articulos a ON md.id_articulo = a.id_artic
                 WHERE md.id_multa = multa.id_multa
             )
             WHERE id_multa = ?`,
            [id]
        );

        res.json({ success: true, message: "Detalle actualizado y total recalculado" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Eliminar un detalle específico
const deleteDetalle = async (req, res) => {
    const { id, id_detalle } = req.params;
    try {
        // Eliminar el detalle
        const [result] = await db.query(
            "DELETE FROM multa_detalle WHERE id_multa = ? AND id_detalle = ?",
            [id, id_detalle]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ success: false, message: "Detalle no encontrado" });

        // Actualizar el total en la tabla multa
        await db.query(
            `UPDATE multa
             SET total = (
                 SELECT SUM(a.precio)
                 FROM multa_detalle md
                 JOIN articulos a ON md.id_articulo = a.id_artic
                 WHERE md.id_multa = multa.id_multa
             )
             WHERE id_multa = ?`,
            [id]
        );

        res.json({ success: true, message: "Detalle eliminado y total recalculado" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getDetallesByMultaId,
    createDetalle,
    updateDetalle,
    deleteDetalle
};
