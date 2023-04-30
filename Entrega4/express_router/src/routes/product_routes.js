const express = require('express');
const fs = require('fs')
const router = express.Router();

const carrito = []

module.exports = router;

class ProductManager {

    static id_nuevo = 0
    static id_carro = 0

    constructor (){
        this.products = []
        this.route = './productos3.json'
        this.rutaCarrito = './carritos.json'
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

    router.get('/products', (req, res) =>{
        if ((req.query.cantidad !== 0) && (productos.length !== 0)){
            for (let i = 0; i < req.query.cantidad; i++){
            const element = productos[i];
            res.send(element)
            }
        }
        res.send(productos)
    })

    router.post('/products', async (req, res) => {
        ProductManager.id_nuevo = ProductManager.id_nuevo + 1
        productos.push({id:ProductManager.id_nuevo, ...req.body})
        this.products.push({id:ProductManager.id_nuevo, ...req.body})
        const cadenaARCHIVOS = JSON.stringify(this.products)
        await fs.promises.writeFile(this.route, cadenaARCHIVOS)
        console.log('Archivo Actualizado')
        res.status(200).send({estado:"actualizado"});
    });

    router.get('/products/:pid', (req, res) =>{
        if (req.params.pid === undefined) {
            res.send(productos);
        } else {
            const id = parseInt(req.params.pid);
            const prod = productos.find((item) => { return item.id === id });
            res.send(prod);
        }
    })

    router.put('/products/:pid', (req, res) =>{
        if (req.params.pid <= 0 && req.params.pid > ProductManager.id_nuevo) {
            console.log("no existe el producto")
        } else {
            const id = parseInt(req.params.pid);
            productos.splice(id-1,1,{id, ...req.body})
            res.send(productos)
        }
    })

    router.delete('/products/:pid', (req, res) =>{
        if (req.params.pid <= 0 && req.params.pid > ProductManager.id_nuevo) {
            console.log("no existe el producto")
        } else {
            const id = parseInt(req.params.pid);
            productos.splice(id-1,1)
            res.send(productos)
        }
    })

    router.post('/carts', (req, res) => {
        ProductManager.id_carro = ProductManager.id_carro + 1
        carrito.push({id:ProductManager.id_carro, ...req.body})
        res.send({estado: "carrito creado"})
    })

    router.get('/carts/:cid', async (req, res) => {
        if (req.params.cid <= 0 && req.params.cid > ProductManager.id_carro) {
            console.log("no existe el carrito")
        } else {
            const id = parseInt(req.params.cid);
            const prod = carrito.find((item) => { return item.id === id });
            carrito.push(prod)
            const cadenaARCHIVOS = JSON.stringify(carrito)
            await fs.promises.writeFile(this.rutaCarrito, cadenaARCHIVOS)
            res.send(prod);
        }
    })

    router.post('/carts/:cid/products/:pid', (req, res) => {
        if (req.params.cid <= 0 && req.params.cid >= ProductManager.id_carro 
            && req.params.pid <= 0 && req.params.pid >= ProductManager.id_nuevo) {
            console.log("no existe el id solicitado")
        } else {
            const idCart = parseInt(req.params.cid);
            const carr = carrito.find((item) => { return item.id === idCart });
            const id = parseInt(req.params.pid);
            const prod = productos.find((item) => { return item.id === id });
            
            if(carr.products[id-1] == undefined){
                carr.products.push({product:prod.id, quiantity:0})
            }
            
            if (carr.products[id-1].product == id) { 
                const existe = carr.products.find((item) => {return item.product === id})
                if (existe){
                    existe.quiantity = existe.quiantity + 1
                }
            } else {
               carr.products.push({product:prod.id, quiantity:1}) 
            }
            res.send({estado: "carrito actualizado"})
        }
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
