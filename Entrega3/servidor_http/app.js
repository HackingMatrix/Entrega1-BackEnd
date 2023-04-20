const http = require('http')

const PUERTO = 8080

const server = http.createServer((req, resp) => {
    resp.end('Backend activo!')
})

server.listen(PUERTO, () => {
    console.log(`Se armó en ${PUERTO}`);
})