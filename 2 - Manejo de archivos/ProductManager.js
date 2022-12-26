//import
import fs from 'fs'

export default class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
    }

    //Defines id incrementally. If there are any products it starts in 1. Otherwise increments the last existing id in 1.
    setId() {
        try {
            let id = 1
            if (this.products.length > 0) {
                id = (Math.max(...this.products.map(product => product.id))) + 1
            }

            return id
        }
        catch (error) {
            console.log(`ERROR: ${error}`)
        }
        
    }

    //Validates object has only the properties defined in properties array.
    validateProperties(product) {
        const properties = ['title', 'description', 'price', 'thumbnail', 'code', 'stock']
        for (let property in properties) {
            if (!(properties[property] in product)) {
                throw new Error (`Mandatory property ${properties[property]} missing`)
            }
        }

        return true      
    }

    //Validates the object sent in product has the property property defined and it is not the id.
    validateProperty(property, product) {
        if ((property == 'id') || !(property in product)) {
            throw new Error (`Property ${property} is not valid`)
        }
        
        return true
    }

    //Validates the code is not already defined for a product
    validateCode(code) {
        const product = this.products.filter(item => item.code == code)
        if (product.length) {
            throw new Error(`Code ${product[0].code} already exists`)
        } else { 
            return true
        }
    }

    //Gets all products in the file specified in path
    async getProducts() {
        this.products = await fs.promises.readFile(this.path)
        if (this.products.length == 0) {
            this.products = []
        }
        else {
            this.products = JSON.parse(this.products)
        }
        return this.products
    }

    //Adds a product into the path file
    async addProduct(product) {
        try{
            this.validateProperties(product)
            this.validateCode(product.code)
            product.id = this.setId()
            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        }catch (error) {
            console.log (`ERROR adding product ${JSON.stringify(product)}. Msg: ${error}`)
        }        
    }
    
    //Get a product by a particular id
    async getProductById(id) {
        try{
            let products = await this.getProducts()
            products = products.filter(item => item.id == id)
            if (products.length) {
                return products[0]
            } else { 
                throw new Error(`ID ${id} not found`)
            }
        }
        catch (error) {
            console.log (`ERROR getting product with id ${id}. Msg: ${error}`)
        }
    }

    //Updates the property with value of a product with matching id  
    async updateProduct(id, property, value) {
        try {
            let oldProduct = await this.getProductById(id)
            this.validateProperty(property, oldProduct)
            oldProduct[property] = value

            let products = (await this.getProducts()).filter(item => item.id != id)
            products.push(oldProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products))

            return oldProduct
        }
        catch (error) {
            console.log (`ERROR updating product ${id}. Msg: ${error}`)
        }

    }

    //Deletes a product with the id sent
    async deleteProduct(id) {
        try {
            let products = (await this.getProducts()).filter(item => item.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        }
        catch (error) {
            console.log (`ERROR deleting product ${id}. Msg: ${error}`)
        }
    }
}
