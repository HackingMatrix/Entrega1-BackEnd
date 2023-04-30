
const express = require('express');

const router = require('./routes/product_routes');

const PUERTO = 8080;

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use( '/api',router);
server.use('/public', express.static(`${__dirname}/public`));


server.listen(PUERTO, () => {
    console.log(`Servidor iniciado en puerto ${PUERTO}`);
});

