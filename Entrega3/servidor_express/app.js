const express = require('express')
const fs = require('fs')

class ProductManager {

    static id_nuevo = 0

    constructor (){
        this.products = []
        this.route = './productos3.json'
    }

    getProducts () {
        console.log(this.products);
        
    }

    
    
    addProduct = async (title, description, price, thumbnail, code, stock,) => {

        ProductManager.id_nuevo = ProductManager.id_nuevo + 1
        const nuevo_producto = {
            id:ProductManager.id_nuevo,
            title: title,
            description: description,
            price:price,
            thumbnail:thumbnail,
            code:code,
            stock:stock
 
        }
        
        if (this.products.find(product => product.code == nuevo_producto.code)){
            console.log('este producto ya existe')
        }
        else{
            this.products.push(nuevo_producto)
            const cadenaARCHIVOS = JSON.stringify(this.products)
            await fs.promises.writeFile(this.route, cadenaARCHIVOS)
            console.log('Archivo Actualizado')
        }
    }

    getProductById (id) {
        const product_id = this.products.find(product => product.id == id)
        console.log(product_id);
    }

    consultarDatos = async () => {
        const productos = await fs.promises.readFile(this.route, 'utf-8')
        return JSON.parse(productos)
    }

    importarDatos (productos) {
        const PUERTO = 8080
        const server = express()

    server.get('/products', (req, res) =>{
        if (req.query.cantidad !== 0){
            for (let i = 0; i < req.query.cantidad; i++){
            const element = array[i];
            res.send(element)
            }
        }
        res.send(console.log(productos))
    })

    server.get('/products/:pid', (req, res) =>{
        if (req.params.pid === undefined) {
            res.send(productos);
        } else {
            const id = parseInt(req.params.pid);
            const prod = productos.find((item) => { return item.id === id });
            res.send(prod);
        }
    })


    server.listen(PUERTO, () => {
        console.log(`Se armó en ${PUERTO}`);
    })
    }
}

const manager = new ProductManager()
manager.getProducts()
manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)
manager.getProducts()
manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','bce405',25)
manager.getProducts()
manager.getProductById(2)
manager.consultarDatos().then((productos) =>{
    manager.importarDatos(productos)
})




