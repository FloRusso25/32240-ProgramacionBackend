//import
import express from 'express'
import fs from 'fs'
import ProductManager from '../class/ProductManager.js'

//class instantiation
let filePath = `${process.cwd()}/products.txt`
console.log(process.cwd())
// fs.closeSync(fs.openSync(filePath, 'w'))
let PM = new ProductManager(`${filePath}`)

//express
const app = express()
const PORT = 8080
app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res) => {

    let products = await PM.getProducts(req.query.limit)
    let productsEmpty = {error: "There are no products saved"}

    res.json( (products != '' ? products : productsEmpty))
})

app.get('/products/:pid', async (req, res) => {
    let product = await PM.getProductById(req.params.pid)

    res.json(product)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})