const mongoose = require('mongoose');

//definicio del esquema para usuarios
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//creacion del modelo acorde al esquema anterior
const User = mongoose.model('User', userSchema);

//aca se exporta el modelo para usarlo en otro archivo de la app
module.exports = User;