const express = require ("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//escuchamos en el puerto 3000
const port = process.env.PORT || 3000;

//rutas de prueba
app.get("/api",(req,res)=>{
    res.send("Bienvenido a la API de VetCare");
});

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conexión exitosa a MongoDB"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

app.listen(port, ()=> console.log("servidor escuchando en el puerto ", port));