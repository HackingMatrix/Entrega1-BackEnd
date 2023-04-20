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
}

const manager = new ProductManager()
manager.getProducts()
manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)
manager.getProducts()
manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','bce405',25)
manager.getProducts()
manager.getProductById(2)
manager.consultarDatos().then((productos) =>{
    console.log(productos)
})