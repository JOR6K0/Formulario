const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Cambia si tienes contraseña
    database: 'escuela' // Asegúrate de que la base esté creada en phpMyAdmin
});

// Ruta para guardar datos
app.post('/guardar', (req, res) => {
    const alumno = req.body;

    const sql = `INSERT INTO alumnos 
        (numero_control, nombre, apellido_paterno, apellido_materno, edad, sexo, direccion, correo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        alumno.numeroControl,
        alumno.nombre,
        alumno.apellidoPaterno,
        alumno.apellidoMaterno,
        alumno.edad,
        alumno.sexo,
        alumno.direccion,
        alumno.correo
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ Error al guardar:', err);
            res.status(500).json({ mensaje: 'Error al guardar el alumno' });
        } else {
            console.log('✅ Alumno guardado');
            res.status(200).json({ mensaje: 'Alumno guardado correctamente' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
