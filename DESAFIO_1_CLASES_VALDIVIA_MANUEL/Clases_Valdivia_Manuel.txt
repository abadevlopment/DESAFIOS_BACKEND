class Usuario {
    constructor(nombre, apellido, mascotas, libros){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = [mascotas];
        this.libros = libros;
    }
    getFullName() {
        console.log(`Nombre completo: ${this.nombre} ${this.apellido}`);
    }
    addMascota(data) {
        this.mascotas.push(data)
        console.log(this.mascotas);
    }
    countMascotas() {
        console.log(this.mascotas.length);
    }
    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor})
        console.log(this.libros);
    }
    getBookNames() {
        console.log(this.libros.map(data => data.nombre));
    }
}

const Libros = [{nombre: 'EL CODIGO DA VINCI', autor: 'DAN BROWN'}, {nombre: 'CABALLO DE TROYA', autor: 'JJ BENITEZ'}]
const Usuario1 = new Usuario ('Manuel', 'Valdivia', 'perro', Libros)
console.log('Usuario:');
console.log(Usuario1);
Usuario1.getFullName()
console.log('Mascotas:');
Usuario1.addMascota('gato')
console.log('Numero de mascotas:');
Usuario1.countMascotas()
console.log('Libros:');
Usuario1.addBook('LA GRAN CATASTROFE AMARILLA', 'JJ BENITEZ')
console.log('Nombres de libros:');
Usuario1.getBookNames()
