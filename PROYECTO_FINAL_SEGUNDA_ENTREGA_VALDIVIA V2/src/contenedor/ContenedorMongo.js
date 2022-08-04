const mongoose = require('mongoose')
require('dotenv').config()
const URI = process.env.URI

try {
    mongoose.connect(
        URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    console.log("Conectado a MongoDB");
} catch (err) {
    console.log("Mongoose could not connect.");
    console.log(err);
}
const dbConnect = mongoose.connection;
dbConnect.on("error", (error) => console.log(`Connection error: ${error}`));
dbConnect.once("open", () => console.log("Conectado a MongoDB"));

class ContenedorMongo {
    constructor(model) {
        this.collection = model
    }

    async getAll() {
        try {
            const all = await this.collection.find()
            return all
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async save(product) {
        const all = await this.getAll()
        const newId = all.length == 0 ? 1 : all[all.length - 1].IdProd + 1
        const time = Date(Date.now()).toString()
        const toSave = { ...product, Timestamp: time, IdProd: newId }

        try {
            await this.collection.create(toSave, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            })
            return toSave
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async getById(id) {
        try {
            const Id = parseInt(id)
            const all = await this.getAll()
            const search = all.find(res => res.IdProd === Id)
            return search || { error: `id: ${id} no encontrado` }
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async deleteById(id) {
        try {
            await this.collection.deleteOne({ IdProd: Number(id) })
            return { mensaje: `borrado` }
        } catch (error) {
            return { error: `${error}` }
        }
    }
// --------------------------------------------------
    async getAllCarts() {
        try {
            const all = await this.collection.find()
            return all
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async createCart() {
        const carts = await this.getAllCarts()
        const newId = carts.length == 0 ? 1 : carts[carts.length - 1].IdCart + 1
        const time = Date(Date.now()).toString()
        const save = { Productos: [], Timestamp: time, IdCart: newId }

        try {
            await this.collection.create(save, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            })
            return { id_del_carrito: `${newId}` }
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async deleteByIdCart(id) {
        try {
            await this.collection.deleteOne({ IdCart: Number(id) })
            return { mensaje: `borrado` }
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async getByIdProducts(id) {        
        try {
            const cart = await this.collection.find({ IdCart: Number(id) })
            const productos = cart[0].Productos
            console.log(productos);

            if (productos.length > 0) {
                return productos
            } else {
                return `carrito vacio`
            }
        } catch (error) {
            return {error: `${error}`} 
        }
    }

    async saveByIdProduct(product, id) {
        try {
            // await fs.promises.writeFile(`${this.route}`, JSON.stringify( carts, null, 2))
            await this.collection.updateOne(
                { IdCart: Number(id) }, 
                { $push: { Productos: product }}, 
                function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    return result
                }}
            )
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async deleteByIdProduct(idCart, idProd) {
        
        try {
            await this.collection.updateOne(
                { IdCart: Number(idCart)},
                { $pull: { Productos: { IdProd: Number(idProd) }}}
            )
            return  { mensaje: `producto con id: ${idProd} borrado `}
        } catch (error) {
            return {error: `${error}`}
        }
    }


}

module.exports = ContenedorMongo