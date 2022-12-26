class ProductManager {
    constructor() {
        this.id = 0
        this.products = []
    }

    validateProperties(product) {
        const properties = ['title', 'description', 'price', 'thumbnail', 'code', 'stock']
        for (let property in properties) {
            if (!(properties[property] in product)) {
                throw new Error (`Mandatory property ${properties[property]} missing`)
            }
        }

        return true      
    }

    validateCode(code) {
        const product = this.products.filter(item => item.code == code)
        if (product.length) {
            throw new Error(`Code ${product[0].code} already exists`)
        } else { 
            return true
        }
    }

    addProduct(product) {
        try{
            this.validateProperties(product)
            this.validateCode(product.code)
            this.id++
            product.id = this.id
            this.products.push(product)
        }catch (error) {
            console.log (`ERROR adding product ${product}. Msg: ${error}`)
        }        
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const product = this.products.filter(item => item.id == id)
        if (product.length) {
            return product
        } else { 
            throw new Error("ID not found")
        }
    }    
}

let pm = new ProductManager()
console.log(pm.getProducts())
const newProduct = {
    title: "producto prueba",
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}
pm.addProduct(newProduct)
console.log(pm.getProducts())

const newProductp = {
    title: "sacapuntas",
    description: 'es un sacapuntas',
    price: 25,
    thumbnail: "https://google.com",
    code: "4555",
    stock: 1222
}
pm.addProduct(newProductp)

console.log(pm.getProducts())

// // Producto nuevo falla por no tener propiedad title
// const newProduct1 = {
    // description: 'Este es un producto prueba',
    // price: 200,
    // thumbnail: "Sin imagen",
    // code: "abc1234",
    // stock: 25
// }
// pm.addProduct(newProduct1)

// // Producto nuevo falla por tener code existente
// const newProduct2 = {
//     title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

// }
// pm.addProduct(newProduct2)

// // Falla por id inexistente
// console.log(pm.getProductById(57))

console.log(pm.getProductById(1))
