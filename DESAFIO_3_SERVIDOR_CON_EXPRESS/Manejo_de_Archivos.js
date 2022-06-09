const fs = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo

    }
    async getAll() {
        try {
            const All = await fs.promises.readFile(`${this.archivo}` , 'utf-8')
            const Lectura = JSON.parse(All,null,2)
            // console.log('LISTADO DE PRODUCTOS: ');
            // console.log(Lectura);
            // console.log( 'Cantidad: ' + Lectura.length);
            // return All
            return Lectura
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
            // console.log('Id del Producto:');
            // console.log(Id);
            // console.log('Productos guardados: ');
            // console.log(Add);
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
                // console.log('Producto con id ' + data + ': ');
                // console.log(Filter);
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
                // console.log('Nuevo listado:');
                // console.log(JSON.parse(await fs.promises.readFile(`${this.archivo}` , 'utf-8')));
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
            // console.log('BORRADO!!!!');
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = Contenedor