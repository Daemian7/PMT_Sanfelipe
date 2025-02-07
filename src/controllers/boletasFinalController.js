const db = require("../db/db");

const insertBoletaFinal = async (req, res) => {
    try {
        const { vencimiento } = req.body;

        if (!vencimiento) {
            return res.status(400).json({ message: "La fecha de vencimiento es obligatoria" });
        }

        const query = "EXEC sp_InsertBoletaFinal @Vencimiento = ?";
        await db.query(query, [vencimiento]);

        res.status(201).json({ message: "Boleta final insertada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al insertar la boleta final", error: error.message });
    }
};

const getBoletas = (req, res) => {
    const query = "EXEC sp_GetBoletas"; // Llamada al procedimiento almacenado

    db.query(query, [], (err, rows) => {
        if (err) {
            console.error("Error ejecutando sp_GetBoletas:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        res.json(rows);
    });
};

const updateEstado = (req, res) => {
    const { id } = req.params; // ID de la boleta
    const { estado } = req.body; // Nuevo estado

    if (!id || !estado) {
        return res.status(400).json({ error: "ID y estado son obligatorios" });
    }

    const query = `UPDATE boleta_final SET estado = ? WHERE id_boletafin = ?`;

    sql.open(connectionString, (err, conn) => {
        if (err) {
            console.error("❌ Error al conectar con SQL Server:", err);
            return res.status(500).json({ error: "Error de conexión con la base de datos" });
        }

        conn.query(query, [estado, id], (err, result) => {
            if (err) {
                console.error("❌ Error al actualizar estado:", err);
                return res.status(500).json({ error: "Error al actualizar el estado" });
            }

            res.json({ mensaje: "✅ Estado actualizado correctamente", filas_afectadas: result });
        });
    });
};


module.exports = { insertBoletaFinal, getBoletas, updateEstado };