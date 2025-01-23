const bcrypt = require("bcrypt");
const db = require("../db/db");

module.exports = {
    // Crear una nueva sesión (registrar usuario)
  // Crear nueva sesión (registrar usuario)
 // Crear sesión
 createSession: (req, res) => {
    const { usuario, passw } = req.body;

    if (!usuario || !passw) {
        return res.status(400).json({ error: "Usuario y contraseña son requeridos" });
    }

    try {
        // Consulta para crear la sesión
        const query = "EXEC CreateSession @p_usuario = ?, @p_passw = ?";
        db.query(query, [usuario, passw], (err) => {
            if (err) {
                return res.status(500).json({ error: "Error al crear la sesión", details: err.message });
            }
            res.status(201).json({ message: "Sesión creada con éxito" });
        });
    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor", details: err.message });
    }
},

// Obtener sesión por ID
getSession: (req, res) => {
    const { id_sess } = req.params;

    const query = "EXEC GetSession @p_id_sess = ?";
    db.query(query, [id_sess], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener la sesión", details: err.message });
        }
        if (rows.length === 0) {
            return res.status(404).json({ message: "Sesión no encontrada" });
        }
        res.status(200).json(rows[0]);
    });
},

// Actualizar sesión
updateSession: (req, res) => {
    const { id_sess } = req.params;
    const { usuario, passw } = req.body;

    if (!usuario || !passw) {
        return res.status(400).json({ error: "Usuario y contraseña son requeridos" });
    }

    try {
        const query = "EXEC UpdateSession @p_id_sess = ?, @p_usuario = ?, @p_passw = ?";
        db.query(query, [id_sess, usuario, passw], (err) => {
            if (err) {
                return res.status(500).json({ error: "Error al actualizar la sesión", details: err.message });
            }
            res.status(200).json({ message: "Sesión actualizada con éxito" });
        });
    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor", details: err.message });
    }
},

       // Iniciar sesión sin encriptar la contraseña
       login: (req, res) => {
        const { usuario, passw } = req.body;

        // Validar si los campos están completos
        if (!usuario || !passw) {
            return res.status(400).json({ error: "Usuario y contraseña son requeridos" });
        }

        try {
            // Consulta para buscar el usuario y la contraseña directamente
            const query = "SELECT * FROM session_init WHERE usuario = ? AND passw = ?";
            db.query(query, [usuario, passw], (err, rows) => {
                if (err) {
                    console.error("Error en la consulta SQL:", err.message);
                    return res.status(500).json({ error: "Error al iniciar sesión" });
                }

                // Verificar si las credenciales coinciden
                if (rows.length === 0) {
                    return res.status(401).json({ error: "Credenciales inválidas" });
                }

                // Si las credenciales son correctas, devolver el éxito
                res.status(200).json({
                    message: "Inicio de sesión exitoso",
                    user: {
                        id_sess: rows[0].id_sess,
                        usuario: rows[0].usuario,
                    },
                });
            });
        } catch (err) {
            console.error("Error durante el proceso de inicio de sesión:", err.message);
            res.status(500).json({
                error: "Error interno del servidor",
                details: err.message,
            });
        }
    },
};
