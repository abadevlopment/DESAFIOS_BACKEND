var admin = require("firebase-admin");
const fire = require('firebase-admin/firestore')
var serviceAccount = require('../db/testcoder-a39dc-firebase-adminsdk-xhicd-d510d47958.json');
// console.log(fire);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
console.log('Conectado a FIRESTORE');

class ContenedorFirebase {
    constructor(coleccion) {
        this.query = db.collection(coleccion)
    }

    async getAll() {
        try {
            const snapshot = await this.query.get()
            const datos = snapshot.docs.map(doc => doc.data())
            datos.sort(function (a, b) {
                return a.IdProd - b.IdProd;
            })
            // console.log('ordenado.....................');
            // console.log(datos);
            return datos
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async save(product) {
        try {
            const snapshot = await this.getAll()
            const newId = snapshot.length === 0 ? 1 : snapshot[(snapshot.length) - 1].IdProd + 1
            const time = Date(Date.now()).toString()
            const toSave = { ...product, Timestamp: time, IdProd: newId }
            let doc = this.query.doc()
            await doc.create(toSave)
            return { mensaje: `Producto guardado` }
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async getById(id) {
        try {
            const snapshot = await this.query.where('IdProd', '==', Number(id)).get()
            const search = snapshot.docs.map(doc => doc.data())
            return search || { error: `id: ${id} no encontrado` }
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async deleteById(id) {
        try {
            const snapshot = await this.query.where('IdProd', '==', Number(id)).get()
            snapshot.forEach(element => {
                element.ref.delete();
                // console.log(`deleted: ${element.id}`);
            });
            return { mensaje: ` Producto con id: ${id} borrado` }
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async getAllCarts() {
        try {
            const snapshot = await this.query.get()
            const datos = snapshot.docs.map(doc => doc.data())
            datos.sort(function (a, b) {
                return a.IdCart - b.IdCart;
            })
            // console.log('ordenado.....................');
            // console.log(datos);
            return datos
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async createCart() {
        try {
            const snapshot = await this.getAllCarts()
            const newId = snapshot.length == 0 ? 1 : snapshot[snapshot.length - 1].IdCart + 1
            const time = Date(Date.now()).toString()
            const toSave = { Productos: [], Timestamp: time, IdCart: newId }
            let doc = this.query.doc()
            await doc.create(toSave)
            return { mensaje: `Carrito con id: ${newId} creado` }
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async deleteByIdCart(id) {
        try {
            const snapshot = await this.query.where('IdCart', '==', Number(id)).get()
            const datos = snapshot.docs.map(doc => doc.data())
            snapshot.forEach(element => {
                element.ref.delete();
                // console.log(`deleted: ${element.id}`);
            });
            if (datos.length > 0) {
                return { mensaje: `Carrito con id: ${id} borrado` }
            } else {
                return { error: `Carrito con id: ${id} no existe` }
            }
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async getByIdProducts(id) {        
        try {
            const snapshot = await this.query.where('IdCart', '==', Number(id)).get()
            const datos = snapshot.docs.map(doc => doc.data())
            const productos = datos[0].Productos
            // console.log(productos);
            if (productos.length > 0) {
                return productos
            } else {
                return { error: `Carrito con id: ${id} no tiene productos` }
            }
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async saveByIdProduct(product, id) {
        try {
            await this.query.where('IdCart', '==', Number(id)).get()
            .then( (snapshot) => {
                snapshot.forEach((doc) => {
                    doc.ref.update('Productos', fire.FieldValue.arrayUnion(product[0]), { merge: true })
                })
            })
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async deleteByIdProduct(idCart, idProd) {
        const snapshot = await db.collection('productos').where('IdProd', '==', Number(idProd)).get()
        const search = snapshot.docs.map(doc => doc.data())
        try {
            await this.query.where('IdCart', '==', Number(idCart)).get()
            .then( (snapshot) => {
                snapshot.forEach((doc) => {
                    doc.ref.update('Productos', fire.FieldValue.arrayRemove(search[0]))
                })
            })
        } catch (error) {
            return { error: `${error}` }
        }
    }

}

module.exports = ContenedorFirebase