class ProductManager {

    static id_nuevo = 0

    constructor (){
        this.products = []
    }

    getProducts () {
        console.log(this.products);
        
    }
    
    addProduct (title, description, price, thumbnail, code, stock,) {

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
            console.log('este producto bla bla')
        }
        else{
            this.products.push(nuevo_producto)
        }
    }

    getProductById (id) {
        const product_id = this.products.find(product => product.id == id)
        console.log(product_id);
    }
}

const manager = new ProductManager()
manager.getProducts()
manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)
manager.getProducts()
manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','bce405',25)
manager.getProducts()
manager.getProductById(2)
