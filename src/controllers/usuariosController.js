const db = require("../db/db"); // Importa el archivo db.js

const insertUsuario = (req, res) => {
  const { name_user, chapa } = req.body;

  const query = "EXEC sp_InsertUsuario @name_user = ?, @chapa = ?";
  const params = [name_user, chapa];

  db.query(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ newUserId: rows[0].NewUserId });
  });
};

const getUsuarios = (req, res) => {
  const query = "EXEC sp_GetUsuarios";

  db.query(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

const getUsuarioById = (req, res) => {
  const { id } = req.params;

  const query = "EXEC sp_GetUsuarioById @Id_user = ?";
  const params = [id];

  db.query(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(rows[0]);
  });
};

const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { name_user, chapa } = req.body;

  const query =
    "EXEC sp_UpdateUsuario @Id_user = ?, @name_user = ?, @chapa = ?";
  const params = [id, name_user, chapa];

  db.query(query, params, (err) => {
    if (err) {
      if (err.message.includes("No se encontró el usuario")) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Usuario actualizado correctamente" });
  });
};

module.exports = {
  insertUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
};
