manuv@DESKTOP-K8S0IS5 MINGW64 /e/CURSOS CODER/30995-programación-backend-20220517T125718Z-001/30995-programación-backend/DESAFIOS/DESAFIO_8_MONGODB (main)
$ mongo
MongoDB shell version v5.0.6
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("4e536582-b12e-483e-ae0c-20a19c09798f") }
MongoDB server version: 6.0.0-rc13
WARNING: shell and server versions do not match
================
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
================
show databases
admin   0.000GB
config  0.000GB
local   0.000GB
mibase  0.000GB
db
test

--Creacion base de datos ecommerce

use ecommerce
switched to db ecommerce

--Chequeo base de datos

db
ecommerce

--Creacion de colecciones

db.createCollection("mensajes")
{ "ok" : 1 }
db.createCollection("productos")
{ "ok" : 1 }

show collections
mensajes
productos

--Agregado y consulta de productos

db.productos.insertMany([
    {title:"producto 1",thumbnail:"url thumbnail 1",price:120},
    {title:"producto 2",thumbnail:"url thumbnail 2",price:580},
    {title:"producto 3",thumbnail:"url thumbnail 3",price:900},
    {title:"producto 4",thumbnail:"url thumbnail 4",price:1280},
    {title:"producto 5",thumbnail:"url thumbnail 5",price:1700},
    {title:"producto 6",thumbnail:"url thumbnail 6",price:2300},
    {title:"producto 7",thumbnail:"url thumbnail 7",price:2860},
    {title:"producto 8",thumbnail:"url thumbnail 8",price:3350},
    {title:"producto 9",thumbnail:"url thumbnail 9",price:4320},
    {title:"producto 10",thumbnail:"url thumbnail 10",price:4990}
])
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("62d6e8ac855b4c852f352321"),
                ObjectId("62d6e8ac855b4c852f352322"),
                ObjectId("62d6e8ac855b4c852f352323"),
                ObjectId("62d6e8ac855b4c852f352324"),
                ObjectId("62d6e8ac855b4c852f352325"),
                ObjectId("62d6e8ac855b4c852f352326"),
                ObjectId("62d6e8ac855b4c852f352327"),
                ObjectId("62d6e8ac855b4c852f352328"),
                ObjectId("62d6e8ac855b4c852f352329"),
                ObjectId("62d6e8ac855b4c852f35232a")
        ]
}

db.productos.find().pretty()
{
        "_id" : ObjectId("62d6e8ac855b4c852f352321"),
        "title" : "producto 1",
        "thumbnail" : "url thumbnail 1",
        "price" : 120
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352322"),
        "title" : "producto 2",
        "thumbnail" : "url thumbnail 2",
        "price" : 580
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352323"),
        "title" : "producto 3",
        "thumbnail" : "url thumbnail 3",
        "price" : 900
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352324"),
        "title" : "producto 4",
        "thumbnail" : "url thumbnail 4",
        "price" : 1280
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352325"),
        "title" : "producto 5",
        "thumbnail" : "url thumbnail 5",
        "price" : 1700
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352326"),
        "title" : "producto 6",
        "thumbnail" : "url thumbnail 6",
        "price" : 2300
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352327"),
        "title" : "producto 7",
        "thumbnail" : "url thumbnail 7",
        "price" : 2860
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352328"),
        "title" : "producto 8",
        "thumbnail" : "url thumbnail 8",
        "price" : 3350
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352329"),
        "title" : "producto 9",
        "thumbnail" : "url thumbnail 9",
        "price" : 4320
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f35232a"),
        "title" : "producto 10",
        "thumbnail" : "url thumbnail 10",
        "price" : 4990
}

--Agregado y consulta de mensajes

db.mensajes.insertMany([
    {author:"usuario 1",fyh:"44761",message:"mensaje prueba 1"},
    {author:"usuario 2",fyh:"44762",message:"mensaje prueba 2"},
    {author:"usuario 3",fyh:"44763",message:"mensaje prueba 3"},
    {author:"usuario 4",fyh:"44764",message:"mensaje prueba 4"},
    {author:"usuario 5",fyh:"44765",message:"mensaje prueba 5"},
    {author:"usuario 6",fyh:"44766",message:"mensaje prueba 6"},
    {author:"usuario 7",fyh:"44767",message:"mensaje prueba 7"},
    {author:"usuario 8",fyh:"44768",message:"mensaje prueba 8"},
    {author:"usuario 9",fyh:"44769",message:"mensaje prueba 9"},
    {author:"usuario 10",fyh:"44770",message:"mensaje prueba 10"}
])
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("62d6ea6bc93d6247fa95e7d6"),
                ObjectId("62d6ea6bc93d6247fa95e7d7"),
                ObjectId("62d6ea6bc93d6247fa95e7d8"),
                ObjectId("62d6ea6bc93d6247fa95e7d9"),
                ObjectId("62d6ea6bc93d6247fa95e7da"),
                ObjectId("62d6ea6bc93d6247fa95e7db"),
                ObjectId("62d6ea6bc93d6247fa95e7dc"),
                ObjectId("62d6ea6bc93d6247fa95e7dd"),
                ObjectId("62d6ea6bc93d6247fa95e7de"),
                ObjectId("62d6ea6bc93d6247fa95e7df")
        ]
}
db.mensajes.find().pretty()
{
        "_id" : ObjectId("62d6ea6bc93d6247fa95e7d6"),
        "author" : "usuario 1",
        "fyh" : "44761",
        "message" : "mensaje prueba 1"
}
{
        "_id" : ObjectId("62d6ea6bc93d6247fa95e7d7"),
        "author" : "usuario 2",
        "fyh" : "44762",
        "message" : "mensaje prueba 2"
}
{
        "_id" : ObjectId("62d6ea6bc93d6247fa95e7d8"),
        "author" : "usuario 3",
        "fyh" : "44763",
        "message" : "mensaje prueba 3"
}
{
        "_id" : ObjectId("62d6ea6bc93d6247fa95e7d9"),
        "author" : "usuario 4",
        "fyh" : "44764",
        "message" : "mensaje prueba 4"
}
{
        "_id" : ObjectId("62d6ea6bc93d6247fa95e7da"),
        "author" : "usuario 5",
        "fyh" : "44765",
        "message" : "mensaje prueba 5"
}
{
        "_id" : ObjectId("62d6ea6bc93d6247fa95e7db"),
        "author" : "usuario 6",
        "fyh" : "44766",
        "message" : "mensaje prueba 6"
}
{
        "_id" : ObjectId("62d6ea6bc93d6247fa95e7dc"),
        "author" : "usuario 7",
        "fyh" : "44767",
        "message" : "mensaje prueba 7"
}
{
        "_id" : ObjectId("62d6ea6bc93d6247fa95e7dd"),
        "author" : "usuario 8",
        "fyh" : "44768",
        "message" : "mensaje prueba 8"
}
{
        "_id" : ObjectId("62d6ea6bc93d6247fa95e7de"),
        "author" : "usuario 9",
        "fyh" : "44769",
        "message" : "mensaje prueba 9"
}
{
        "_id" : ObjectId("62d6ea6bc93d6247fa95e7df"),
        "author" : "usuario 10",
        "fyh" : "44770",
        "message" : "mensaje prueba 10"
}

--Cantidad de documentos en cada coleccion

db.productos.estimatedDocumentCount()
10
db.mensajes.estimatedDocumentCount()
10

--Realizar un CRUD sobre la colección de productos:
-- a) Agregar un producto más en la colección de productos 

    db.productos.insertOne({title:"producto 11",thumbnail:"url thumbnail 11",price:4500})
{
        "acknowledged" : true,
        "insertedId" : ObjectId("62d6f0d7c93d6247fa95e7e0")
}
db.productos.find().pretty()
{
        "_id" : ObjectId("62d6e8ac855b4c852f352321"),
        "title" : "producto 1",
        "thumbnail" : "url thumbnail 1",
        "price" : 120
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352322"),
        "title" : "producto 2",
        "thumbnail" : "url thumbnail 2",
        "price" : 580
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352323"),
        "title" : "producto 3",
        "thumbnail" : "url thumbnail 3",
        "price" : 900
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352324"),
        "title" : "producto 4",
        "thumbnail" : "url thumbnail 4",
        "price" : 1280
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352325"),
        "title" : "producto 5",
        "thumbnail" : "url thumbnail 5",
        "price" : 1700
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352326"),
        "title" : "producto 6",
        "thumbnail" : "url thumbnail 6",
        "price" : 2300
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352327"),
        "title" : "producto 7",
        "thumbnail" : "url thumbnail 7",
        "price" : 2860
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352328"),
        "title" : "producto 8",
        "thumbnail" : "url thumbnail 8",
        "price" : 3350
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352329"),
        "title" : "producto 9",
        "thumbnail" : "url thumbnail 9",
        "price" : 4320
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f35232a"),
        "title" : "producto 10",
        "thumbnail" : "url thumbnail 10",
        "price" : 4990
}
{
        "_id" : ObjectId("62d6f0d7c93d6247fa95e7e0"),
        "title" : "producto 11",
        "thumbnail" : "url thumbnail 11",
        "price" : 4500
}

-- b) Realizar una consulta por nombre de producto específico:

db.productos.find({title:"producto 8"}).pretty()
{
        "_id" : ObjectId("62d6e8ac855b4c852f352328"),
        "title" : "producto 8",
        "thumbnail" : "url thumbnail 8",
        "price" : 3350
}

    -- i) Listar los productos con precio menor a 1000 pesos.

db.productos.find({price: {$lt: 1000}}).pretty()
{
        "_id" : ObjectId("62d6e8ac855b4c852f352321"),
        "title" : "producto 1",
        "thumbnail" : "url thumbnail 1",
        "price" : 120
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352322"),
        "title" : "producto 2",
        "thumbnail" : "url thumbnail 2",
        "price" : 580
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352323"),
        "title" : "producto 3",
        "thumbnail" : "url thumbnail 3",
        "price" : 900
}

    -- ii) Listar los productos con precio entre los 1000 a 3000 pesos.

db.productos.find({price: {$gt: 1000, $lt: 3000}}).pretty()
{
        "_id" : ObjectId("62d6e8ac855b4c852f352324"),
        "title" : "producto 4",
        "thumbnail" : "url thumbnail 4",
        "price" : 1280
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352325"),
        "title" : "producto 5",
        "thumbnail" : "url thumbnail 5",
        "price" : 1700
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352326"),
        "title" : "producto 6",
        "thumbnail" : "url thumbnail 6",
        "price" : 2300
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352327"),
        "title" : "producto 7",
        "thumbnail" : "url thumbnail 7",
        "price" : 2860
}

    -- iii) Listar los productos con precio mayor a 3000 pesos.

db.productos.find({price: {$gt: 3000}}).pretty()
{
        "_id" : ObjectId("62d6e8ac855b4c852f352328"),
        "title" : "producto 8",
        "thumbnail" : "url thumbnail 8",
        "price" : 3350
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352329"),
        "title" : "producto 9",
        "thumbnail" : "url thumbnail 9",
        "price" : 4320
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f35232a"),
        "title" : "producto 10",
        "thumbnail" : "url thumbnail 10",
        "price" : 4990
}
{
        "_id" : ObjectId("62d6f0d7c93d6247fa95e7e0"),
        "title" : "producto 11",
        "thumbnail" : "url thumbnail 11",
        "price" : 4500
}

    -- iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

db.productos.find({}, { title: 1}).sort({price: 1}).skip(2).limit(1).pretty()
{ "_id" : ObjectId("62d6e8ac855b4c852f352323"), "title" : "producto 3" }

-- c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

db.productos.updateMany({}, {$set: {stock: 100}})
{ "acknowledged" : true, "matchedCount" : 11, "modifiedCount" : 11 }
db.productos.find().pretty()
{
        "_id" : ObjectId("62d6e8ac855b4c852f352321"),
        "title" : "producto 1",
        "thumbnail" : "url thumbnail 1",
        "price" : 120,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352322"),
        "title" : "producto 2",
        "thumbnail" : "url thumbnail 2",
        "price" : 580,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352323"),
        "title" : "producto 3",
        "thumbnail" : "url thumbnail 3",
        "price" : 900,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352324"),
        "title" : "producto 4",
        "thumbnail" : "url thumbnail 4",
        "price" : 1280,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352325"),
        "title" : "producto 5",
        "thumbnail" : "url thumbnail 5",
        "price" : 1700,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352326"),
        "title" : "producto 6",
        "thumbnail" : "url thumbnail 6",
        "price" : 2300,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352327"),
        "title" : "producto 7",
        "thumbnail" : "url thumbnail 7",
        "price" : 2860,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352328"),
        "title" : "producto 8",
        "thumbnail" : "url thumbnail 8",
        "price" : 3350,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352329"),
        "title" : "producto 9",
        "thumbnail" : "url thumbnail 9",
        "price" : 4320,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f35232a"),
        "title" : "producto 10",
        "thumbnail" : "url thumbnail 10",
        "price" : 4990,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6f0d7c93d6247fa95e7e0"),
        "title" : "producto 11",
        "thumbnail" : "url thumbnail 11",
        "price" : 4500,
        "stock" : 100
}

-- d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 

db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}})
{ "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
db.productos.find().pretty()
{
        "_id" : ObjectId("62d6e8ac855b4c852f352321"),
        "title" : "producto 1",
        "thumbnail" : "url thumbnail 1",
        "price" : 120,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352322"),
        "title" : "producto 2",
        "thumbnail" : "url thumbnail 2",
        "price" : 580,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352323"),
        "title" : "producto 3",
        "thumbnail" : "url thumbnail 3",
        "price" : 900,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352324"),
        "title" : "producto 4",
        "thumbnail" : "url thumbnail 4",
        "price" : 1280,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352325"),
        "title" : "producto 5",
        "thumbnail" : "url thumbnail 5",
        "price" : 1700,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352326"),
        "title" : "producto 6",
        "thumbnail" : "url thumbnail 6",
        "price" : 2300,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352327"),
        "title" : "producto 7",
        "thumbnail" : "url thumbnail 7",
        "price" : 2860,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352328"),
        "title" : "producto 8",
        "thumbnail" : "url thumbnail 8",
        "price" : 3350,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352329"),
        "title" : "producto 9",
        "thumbnail" : "url thumbnail 9",
        "price" : 4320,
        "stock" : 0
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f35232a"),
        "title" : "producto 10",
        "thumbnail" : "url thumbnail 10",
        "price" : 4990,
        "stock" : 0
}
{
        "_id" : ObjectId("62d6f0d7c93d6247fa95e7e0"),
        "title" : "producto 11",
        "thumbnail" : "url thumbnail 11",
        "price" : 4500,
        "stock" : 0
}

-- e) Borrar los productos con precio menor a 1000 pesos 

db.productos.deleteMany({price: {$lt: 1000}})
{ "acknowledged" : true, "deletedCount" : 3 }
db.productos.find().pretty()
{
        "_id" : ObjectId("62d6e8ac855b4c852f352324"),
        "title" : "producto 4",
        "thumbnail" : "url thumbnail 4",
        "price" : 1280,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352325"),
        "title" : "producto 5",
        "thumbnail" : "url thumbnail 5",
        "price" : 1700,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352326"),
        "title" : "producto 6",
        "thumbnail" : "url thumbnail 6",
        "price" : 2300,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352327"),
        "title" : "producto 7",
        "thumbnail" : "url thumbnail 7",
        "price" : 2860,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352328"),
        "title" : "producto 8",
        "thumbnail" : "url thumbnail 8",
        "price" : 3350,
        "stock" : 100
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f352329"),
        "title" : "producto 9",
        "thumbnail" : "url thumbnail 9",
        "price" : 4320,
        "stock" : 0
}
{
        "_id" : ObjectId("62d6e8ac855b4c852f35232a"),
        "title" : "producto 10",
        "thumbnail" : "url thumbnail 10",
        "price" : 4990,
        "stock" : 0
}
{
        "_id" : ObjectId("62d6f0d7c93d6247fa95e7e0"),
        "title" : "producto 11",
        "thumbnail" : "url thumbnail 11",
        "price" : 4500,
        "stock" : 0
}
