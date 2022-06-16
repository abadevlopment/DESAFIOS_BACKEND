const express = require('express')
const { Router } = express
const productos = require('./api/products')

const router = Router()

const ArrayProductos = [
    {
        title: "Pan",
        price: 25.45,
        thumbnail: "url1",
        id: 1
      },
      {
        title: "Aceite",
        price: 74.56,
        thumbnail: "url2",
        id: 2
      },
      {
        title: "Azucar",
        price: 45.67,
        thumbnail: "url3",
        id: 3
      }
]

const prod = new productos (ArrayProductos)

router.get('', (req, res) => {
    prod.getAll().then(resp => res.send(resp))
})

router.get('/:id', (req, res) => {
    prod.getById(parseInt(req.params.id)).then(resp => res.send(resp))
})

router.post('', (req, res) => {
    console.log(req.body);
    prod.save(req.body).then(resp => res.send(resp))
})

router.put('/:id', (req, res) => {
    // prod.updateById((parseInt(req.params.id)), {title: 'Huevos', price: 20, thumbnail: 'url6'}).then(resp => res.send(resp))
    prod.updateById((parseInt(req.params.id)), (req.body)).then(resp => res.send(resp))
})

router.delete('/:id', (req, res) => {
    prod.deleteById(parseInt(req.params.id)).then(resp => res.send(resp))
})

module.exports = router