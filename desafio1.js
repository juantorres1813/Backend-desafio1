class Usuario{
    constructor(nombre, apellido, libros = [], mascotas = []){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascotas(mascota) {
        this.mascotas.push(mascota)
    }

    contarMascotas() {
        return this.mascotas.length
    }

    addLibro(titulo, autor) {
        this.libros.push({titulo, autor})
    }

    getNombreLibros() {
        const NombresLibros = [];

        this.libros.forEach((libro) => {
            NombresLibros.push(libro.titulo)
        })

        return NombresLibros;
    }

}

const usuario1 = new Usuario(
    "Juan",
    "Torres", 
    [{titulo: "Harry Potter", autor: "JK Rowling"}],
    ["perro", "gato"]
);

// console.log(usuario1.getFullName());

// console.log({cantidad: usuario1.contarMascotas()});

usuario1.addMascotas("hamster")

// console.log({cantidad: usuario1.contarMascotas()});

usuario1.addLibro("El Señor de los Anillos","Autor S.A.")

const NombreLibro = usuario1.getNombreLibros()
// console.log(NombreLibro)