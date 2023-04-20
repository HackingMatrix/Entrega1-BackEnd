const express = require('express')

const PUERTO = 8080

const server = express()

server.get('', () =>{
    
})

server.listen(PUERTO, () => {
    console.log(`Se armó en ${PUERTO}`);
})