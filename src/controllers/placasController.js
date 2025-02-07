const db = require("../db/db"); // Importa el archivo db.js

// Insertar una nueva placa
const insertPlaca = (req, res) => {
  const { placa, placa_inicial } = req.body; // Ajustamos a los parámetros del SP

  const query = "EXEC sp_InsertarPlaca @placa = ?, @placa_inicial = ?";
  const params = [placa, placa_inicial];

  db.query(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ newPlacaId: rows[0]?.id_placa });
  });
};

// Obtener todas las placas o una placa por ID
const getPlacas = (req, res) => {
  const { id } = req.params; // Parámetro opcional (para un solo registro)

  const query = "EXEC sp_ObtenerPlacas @id_placa = ?";
  const params = id ? [id] : [null];

  db.query(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (id && rows.length === 0) {
      return res.status(404).json({ error: "Placa no encontrada" });
    }
    res.json(id ? rows[0] : rows); // Devuelve una o todas las placas
  });
};



const updatePlaca = (req, res) => {
  const { id } = req.params;
  const { placa, placa_inicial } = req.body;

  const query =
    "EXEC sp_ActualizarPlaca @id_placa = ?, @placa = ?, @placa_inicial = ?";
  const params = [id, placa, placa_inicial];

  db.query(query, params, (err, rows) => {
    if (err) {
      // Finalizar inmediatamente en caso de error
      res.status(500).json({ error: err.message });
      return;
    }

    // Validar si se encontró una fila actualizada
    if (!rows || rows[0]?.filas_actualizadas === 0) {
      // Finalizar inmediatamente si no se actualizó nada
      res.status(404).json({ error: "Placa no encontrada" });
      return;
    }

    // Enviar respuesta de éxito
    res.json({ message: "Placa actualizada correctamente" });
  });
};

  

module.exports = {
  insertPlaca,
  getPlacas,
  updatePlaca,
};
