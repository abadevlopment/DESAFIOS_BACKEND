const fs = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }
    async getAll() {
        try {
            const All = await fs.promises.readFile(`${this.archivo}` , 'utf-8')
            const Lectura = JSON.parse(All)
            console.log('LISTADO DE PRODUCTOS: ');
            console.log(Lectura);
            // console.log(typeof(Lectura));
            console.log( 'Cantidad: ' + Lectura.length);
            // console.log(typeof(Lectura.length));
        } catch (error) {
            console.log(error);
        }
    }

    async save(data) {
        try {
            const All = await fs.promises.readFile(`${this.archivo}` , 'utf-8')
            const Add = JSON.parse(All)
            // const Id = (Add.length) + 1
            const Id = Add.length == 0 ? 1 : Add[Add.length-1].id + 1;
            Add.push({id: Id, ...data})
            console.log('Id del Producto:');
            console.log(Id);
            console.log('Productos guardados: ');
            console.log(Add);
            const ToAdd = JSON.stringify(Add,null,2)
            await fs.promises.writeFile(`${this.archivo}` , ToAdd)

        } catch (error) {
            console.log(error);
        }
    }
    async getById(data) {
        try {
            const All = await fs.promises.readFile(`${this.archivo}` , 'utf-8')
            const Get = JSON.parse(All)
            const Filter = Get.filter( res => res.id === data)
            if (Filter.length > 0) {
                console.log('Producto con id ' + data + ': ');
                console.log(Filter);
            } else {
                console.log('El Id ingresado no existe!!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(data) {
        try {
            const All = await fs.promises.readFile(`${this.archivo}` , 'utf-8')
            const Get = JSON.parse(All)
            const Index = Get.findIndex(res => res.id == data)
            if (Index != -1) {
                Get.splice(Index, 1);
                const ToAdd = JSON.stringify(Get, null, 2)
                await fs.promises.writeFile(`${this.archivo}` , ToAdd)
                console.log('Nuevo listado:');
                console.log(JSON.parse(await fs.promises.readFile(`${this.archivo}` , 'utf-8')));
            } else {
                console.log('El Id ingresado no existe!!');
            }

        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`${this.archivo}` , '[]')
            console.log('BORRADO!!!!');
        } catch (error) {
            console.log(error);
        }
    }
}

class Producto {
    constructor(title, price, thumbnail){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

const Contenedor1 = new Contenedor ('./Productos.txt')
const Producto1 = new Producto ( 'pan', 10, 'url1' )
const Producto2 = new Producto ( 'te', 20, 'url2' )
const Producto3 = new Producto ( 'cafe', 5, 'url3' )
const Producto4 = new Producto ( 'cola', 5, 'url4' )

// //LECTURA DE ARCHIVO INICIAL RESULTADO VACIO
Contenedor1.getAll()

// //GUARDADO Y LECTURA PRODUCTO 1
// Contenedor1.save(Producto1)

// //GUARDADO Y LECTURA PRODUCTO 2
// Contenedor1.save(Producto2)

// //GUARDADO Y LECTURA PRODUCTO 3
// Contenedor1.save(Producto3)

// //GUARDADO Y LECTURA PRODUCTO 4
// Contenedor1.save(Producto4)

// //LECTURA DE ARCHIVO FINAL RESULTADO VACIO
// Contenedor1.getAll()

// // OBTENER PRODUCTO POR ID
// Contenedor1.getById(2)

// // OBTENER PRODUCTO POR ID ERRONEO
// Contenedor1.getById(-3)

// // BORRAR PRODUCTO POR ID
// Contenedor1.deleteById(2)

// // BORRAR PRODUCTO POR ID
// Contenedor1.deleteById(20)

//BORRAR TODO
// Contenedor1.deleteAll()

// //LECTURA DE ARCHIVO FINAL RESULTADO VACIO
// Contenedor1.getAll()

