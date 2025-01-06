const db = require("../db/connection");

const getAllBoletas = (req, res) => {
    const query = "EXEC sp_GetInfoBoletas";
    db.query(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

const getBoletaById = (req, res) => {
    const query = "EXEC sp_GetInfoBoletaById @id_info = ?";
    db.query(query, [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

const createBoleta = (req, res) => {
    const { ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac } = req.body;
    const query = `EXEC sp_InsertInfoBoleta 
                   @ubicacion = ?, 
                   @fecha = ?, 
                   @hora = ?, 
                   @id_usuario = ?, 
                   @observaciones = ?, 
                   @id_firma = ?, 
                   @id_infrac = ?`;

    db.query(query, [ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Boleta created successfully" });
    });
};

const updateBoleta = (req, res) => {
    const { ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac } = req.body;
    const query = `EXEC sp_UpdateInfoBoleta 
                   @id_info = ?, 
                   @ubicacion = ?, 
                   @fecha = ?, 
                   @hora = ?, 
                   @id_usuario = ?, 
                   @observaciones = ?, 
                   @id_firma = ?, 
                   @id_infrac = ?`;

    db.query(query, [req.params.id, ubicacion, fecha, hora, id_usuario, observaciones, id_firma, id_infrac], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Boleta updated successfully" });
    });
};

const deleteBoleta = (req, res) => {
    const query = "DELETE FROM info_boleta WHERE id_info = ?";
    db.query(query, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Boleta deleted successfully" });
    });
};

module.exports = {
    getAllBoletas,
    getBoletaById,
    createBoleta,
    updateBoleta,
    deleteBoleta,
};
