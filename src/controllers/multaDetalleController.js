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
<<<<<<< HEAD

// Obtener todos los detalles de multas
const getAllMultaDetalles = (req, res) => {
  const query = "EXEC sp_GetMultaDetalles";

  db.query(query, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Error al obtener los detalles de multas", details: err });
    } else {
      res.status(200).send(rows);
    }
  });
};

// Obtener detalle de multa por ID
const getMultaDetalleById = (req, res) => {
  const { id } = req.params;
  const query = "EXEC sp_GetMultaDetalleById @id_detalle = ?";

  db.query(query, [id], (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Error al obtener el detalle de multa", details: err });
    } else {
      res.status(200).send(rows[0]);
    }
  });
};

// Actualizar detalle de multa y actualizar el total
const updateMultaDetalle = (req, res) => {
  const { id } = req.params;
  const { id_multa, id_articulo, sub_total } = req.body;
  const query = "EXEC sp_UpdateMultaDetalle @id_detalle = ?, @id_multa = ?, @id_articulo = ?, @sub_total = ?";

  db.query(query, [id, id_multa, id_articulo, sub_total], (err) => {
    if (err) {
      res.status(500).send({ error: "Error al actualizar el detalle de multa", details: err });
    } else {
      // Actualizar el total de la multa
      const updateQuery = "EXEC sp_UpdateMultaTotal @id_multa = ?";
      db.query(updateQuery, [id_multa], (updateErr) => {
        if (updateErr) {
          res.status(500).send({ error: "Error al actualizar el total de la multa", details: updateErr });
        } else {
          res.status(200).send({ message: "Detalle de multa actualizado y total actualizado correctamente" });
        }
      });
    }
  });
};


// Obtener la suma de subtotales para una multa específica
// const getMultaSubtotales = (req, res) => {
//   const { id } = req.params;
//   const query = "EXEC sp_GetMultaTotalSubtotales @id_multa = ?";

//   db.query(query, [id], (err, rows) => {
//     if (err) {
//       res.status(500).send({ error: "Error al calcular los subtotales", details: err });
//     } else if (rows.length === 0 || rows[0].total_subtotales === null) {
//       res.status(404).send({ message: "No se encontraron subtotales para esta multa" });
//     } else {
//       res.status(200).send({ total_subtotales: rows[0].total_subtotales });
//     }
//   });
// };



module.exports = { createMultaDetalle, getAllMultaDetalles, getMultaDetalleById, updateMultaDetalle };
=======
>>>>>>> dev
