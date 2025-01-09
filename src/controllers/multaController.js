const db = require("../db/db");

// Crear multa
const createMulta = (req, res) => {
  const { id_boleta, total } = req.body;
  const query = "EXEC sp_InsertMulta @id_boleta = ?, @total = ?";

  db.query(query, [id_boleta, total], (err) => {
    if (err) {
      res.status(500).send({ error: "Error al crear la multa", details: err });
    } else {
      res.status(201).send({ message: "Multa creada correctamente" });
    }
  });
};

// Obtener todas las multas
const getAllMultas = (req, res) => {
  const query = "EXEC sp_GetMultas";

  db.query(query, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Error al obtener multas", details: err });
    } else {
      res.status(200).send(rows);
    }
  });
};

// Obtener una multa por ID
const getMultaById = (req, res) => {
  const { id } = req.params;
  const query = "EXEC sp_GetMultaById @id_multa = ?";

  db.query(query, [id], (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Error al obtener la multa", details: err });
    } else {
      res.status(200).send(rows[0]);
    }
  });
};

// Actualizar multa
const updateMulta = (req, res) => {
  const { id } = req.params;
  const { id_boleta, total } = req.body;
  const query = "EXEC sp_UpdateMulta @id_multa = ?, @id_boleta = ?, @total = ?";

  db.query(query, [id, id_boleta, total], (err) => {
    if (err) {
      res.status(500).send({ error: "Error al actualizar la multa", details: err });
    } else {
      res.status(200).send({ message: "Multa actualizada correctamente" });
    }
  });
};

// // Actualizar el total de una multa basado en los subtotales de multa_detalle
// const updateMultaTotal = (req, res) => {
//   const { id } = req.params;
//   const query = "EXEC sp_UpdateMultaTotal @id_multa = ?";

//   db.query(query, [id], (err) => {
//     if (err) {
//       res.status(500).send({ error: "Error al actualizar el total de la multa", details: err });
//     } else {
//       res.status(200).send({ message: "Total de la multa actualizado correctamente" });
//     }
//   });
// };

module.exports = { createMulta, getAllMultas, getMultaById, updateMulta };
