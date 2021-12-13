const ex = require('express');
const prod = require('./contenedor.js') ;

//Numero aleatorio
 numeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
 }

const ruta = './productos.txt';
let productos = [];
let registros = new prod.contenedor(ruta);


registros.getAll().then(reg=>productos=reg);
const app = ex();
console.log(productos.length);
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor en puerto ${server.address().port}`);
})

server.on("error", error => console.log(`error en servvidor ${error}`));

app.get('/productos', (req, res) => {
    
    res.send(productos);
    console.log(productos.length);
})

app.get('/productoRandom', (req, res) => {
    
    numAleatorio = numeroAleatorio(0,productos.length)
    res.send(productos[numAleatorio]);
})