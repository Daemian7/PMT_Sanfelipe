const bcrypt = require("bcrypt");
const db = require("../db/db");

module.exports = {
    // Create a new session (register user)
    createSession: async (req, res) => {
        const { usuario, passw } = req.body;

        if (!usuario || !passw) {
            return res.status(400).json({ error: "Usuario y contraseña son requeridos" });
        }

        try {
            const hashedPassword = await bcrypt.hash(passw, 10); // Encrypt password
            const query = "EXEC CreateSession @p_usuario = ?, @p_passw = ?";
            db.query(query, [usuario, hashedPassword], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error al crear la sesión", details: err.message });
                }
                res.status(201).json({ message: "Sesión creada con éxito" });
            });
        } catch (err) {
            res.status(500).json({ error: "Error al encriptar la contraseña", details: err.message });
        }
    },

    // Get session by ID
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

    // Update session
    updateSession: async (req, res) => {
        const { id_sess } = req.params;
        const { usuario, passw } = req.body;

        if (!usuario || !passw) {
            return res.status(400).json({ error: "Usuario y contraseña son requeridos" });
        }

        try {
            const hashedPassword = await bcrypt.hash(passw, 10); // Encrypt password
            const query = "EXEC UpdateSession @p_id_sess = ?, @p_usuario = ?, @p_passw = ?";
            db.query(query, [id_sess, usuario, hashedPassword], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error al actualizar la sesión", details: err.message });
                }
                res.status(200).json({ message: "Sesión actualizada con éxito" });
            });
        } catch (err) {
            res.status(500).json({ error: "Error al encriptar la contraseña", details: err.message });
        }
    },

    // Login user
    login: (req, res) => {
        const { usuario, passw } = req.body;

        if (!usuario || !passw) {
            return res.status(400).json({ error: "Usuario y contraseña son requeridos" });
        }

        const query = "SELECT * FROM session_init WHERE usuario = ?";
        db.query(query, [usuario], async (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Error al iniciar sesión", details: err.message });
            }
            if (rows.length === 0) {
                return res.status(401).json({ error: "Credenciales inválidas" });
            }

            const user = rows[0];
            const passwordMatch = await bcrypt.compare(passw, user.passw);

            if (!passwordMatch) {
                return res.status(401).json({ error: "Credenciales inválidas" });
            }

            res.status(200).json({ message: "Inicio de sesión exitoso", user: { id_sess: user.id_sess, usuario: user.usuario } });
        });
    },
};
