//import
import fs from 'fs'
import ProductManager from './ProductManager.js'


const test = async () => {
    let filePath = `${process.cwd()}/products.txt`
    fs.closeSync(fs.openSync(filePath, 'w'))
    let PM = new ProductManager(`${filePath}`)

    const newProduct = {
        title: "producto prueba",
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    }

    const newProduct2 = {
        title: "producto prueba para borrar",
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc124",
        stock: 25
    }

    console.log(`File content: \n ${JSON.stringify(await PM.getProducts())} \n`)
    await PM.addProduct(newProduct)
    await PM.addProduct(newProduct2)
    console.log(`File content: \n ${JSON.stringify(await PM.getProducts())} \n`)
    console.log(`Product with id 1: ${JSON.stringify(await PM.getProductById(1))} \n`)
    await PM.getProductById(8)
    console.log('')
    console.log(`Update title property: ${JSON.stringify(await PM.updateProduct(1, 'title', 'nuevo titulo'))} \n`)
    console.log(`File content: \n ${JSON.stringify(await PM.getProducts())} \n`)
    await PM.updateProduct(1, 'id', 123)
    console.log('')
    await PM.deleteProduct(1)
    console.log(`Product with id 1 deleted: \n ${JSON.stringify(await PM.getProducts())} \n`)
}
test()