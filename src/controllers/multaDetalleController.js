const db = require("../db");

// Crear detalle de multa
const createMultaDetalle = (req, res) => {
  const { id_multa, id_articulo, sub_total } = req.body;
  const query = "EXEC sp_InsertMultaDetalle @id_multa = ?, @id_articulo = ?, @sub_total = ?";

  db.query(query, [id_multa, id_articulo, sub_total], (err) => {
    if (err) {
      res.status(500).send({ error: "Error al crear el detalle de multa", details: err });
    } else {
      res.status(201).send({ message: "Detalle de multa creado correctamente" });
    }
  });
};

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
const getMultaSubtotales = (req, res) => {
  const { id } = req.params;
  const query = "EXEC sp_GetMultaTotalSubtotales @id_multa = ?";

  db.query(query, [id], (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Error al calcular los subtotales", details: err });
    } else if (rows.length === 0 || rows[0].total_subtotales === null) {
      res.status(404).send({ message: "No se encontraron subtotales para esta multa" });
    } else {
      res.status(200).send({ total_subtotales: rows[0].total_subtotales });
    }
  });
};



module.exports = { createMultaDetalle, getAllMultaDetalles, getMultaDetalleById, updateMultaDetalle, getMultaSubtotales };
