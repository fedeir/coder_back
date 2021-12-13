const ex = require('express');
const prod = require('./contenedor.js') ;

const ruta = './productos.txt';
let productos = [];
let registros = new prod.contenedor(ruta);

registros.getAll().then(reg=>productos=reg);
const app = ex();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor en puerto ${server.address().port}`);
})

server.on("error", error => console.log(`error en servvidor ${error}`));

app.get('/productos', (req, res) => {
    
    res.send(productos);

})

app.get('/random', (req, res) => {
    
    res.send(productos);

})