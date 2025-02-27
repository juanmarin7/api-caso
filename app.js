const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const User = require('./models/User');

// se uso dotenv para usar la URL de conexion como variable de entorno
// y no dejar datos sensibles expuestos
const uri = process.env.MONGO_URI;

//usamos bodyparser para el correcto uso de los datos 
// y datos de formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//conexion a MongoDB
mongoose.connect(uri)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error("Error al conectar a MongoDB", err));

// Ruta de inicio, se uso para probar la conexion inicial
app.get('/', (req, res) => {
    res.send('Server iniciado...');
});

//registro de usuario http://localhost:5550/register
app.post('/register', async (req, res) => {
    try {
        //este seria el request para el registro que se envia en el body de la peticion
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
});

//ruta de inicio de sesión http://localhost:5550/login
app.post('/login', async (req, res) => {
    try {
        //este seria el request para el logeo que se envia en el body de la peticion
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: "Autenticación fallida" });
        }
        res.json({ message: "Autenticación exitosa" });
    } catch (error) {
        res.status(500).json({ error: "Error en el proceso de autenticación" });
    }
});

//esta seria la url para usar el servicio http://localhost:5550/
app.listen(5550, () => {
    console.log("Servidor ejecutándose en el puerto 5550");
});
