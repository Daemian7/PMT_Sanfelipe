const db = require("../db/connection");

const getAllBoletasFinales = (req, res) => {
    const query = "EXEC sp_ObtenerBoletasFinales";
    db.query(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

const getBoletaFinalById = (req, res) => {
    const query = "EXEC sp_ObtenerBoletaFinalPorId @id_boletafin = ?";
    db.query(query, [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows[0]); // Devuelve solo un objeto
    });
};

const createBoletaFinal = (req, res) => {
    const { id_boleta, id_info_boleta, id_multa, estado, imagen } = req.body;
    const query = `EXEC sp_InsertarBoletaFinal 
                   @id_boleta = ?, 
                   @id_info_boleta = ?, 
                   @id_multa = ?, 
                   @estado = ?, 
                   @imagen = ?`;

    db.query(query, [id_boleta, id_info_boleta, id_multa, estado, imagen], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Boleta final creada", id_boletafin: rows[0]?.id_boletafin });
    });
};

const updateBoletaFinal = (req, res) => {
    const { id_boleta, id_info_boleta, id_multa, estado, imagen } = req.body;
    const query = `EXEC sp_ActualizarBoletaFinal 
                   @id_boletafin = ?, 
                   @id_boleta = ?, 
                   @id_info_boleta = ?, 
                   @id_multa = ?, 
                   @estado = ?, 
                   @imagen = ?`;

    db.query(query, [req.params.id, id_boleta, id_info_boleta, id_multa, estado, imagen], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Boleta final actualizada correctamente" });
    });
};

module.exports = {
    getAllBoletasFinales,
    getBoletaFinalById,
    createBoletaFinal,
    updateBoletaFinal,
};
