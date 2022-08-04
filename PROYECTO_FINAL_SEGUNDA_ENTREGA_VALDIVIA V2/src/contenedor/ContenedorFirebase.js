var admin = require("firebase-admin");

var serviceAccount = require('../db/testcoder-a39dc-firebase-adminsdk-xhicd-d510d47958.json');

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
            const datos = await this.getAll()
            const newId = datos.length === 0 ? 1 : datos[(datos.length) - 1].IdProd + 1
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

}

module.exports = ContenedorFirebase