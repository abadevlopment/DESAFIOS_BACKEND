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
}

module.exports = ContenedorFirebase