const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const PORT = 8080 || process.env.PORT

const apiProducts = require('./api/products.js')
const prods = new apiProducts()

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
    }

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logErrors)

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs'
    })
)
app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/productos', (req, res) => {
    const products = prods.getAll()
    // console.log(products);
    res.render('listaProductos.hbs', {
        Products: products,
        ProductsQty: products.length
    })
})

app.post('/productos', (req, res) => {
    const product = req.body
    // console.log(product);
    prods.save(product)
    res.redirect('/')
})


const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))