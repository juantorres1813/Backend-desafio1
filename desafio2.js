const fs = require('fs')

class Contenedor{
    constructor(archivo, title, price, thumbnail){
        this.file = archivo
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile('./productos.txt', 'utf-8')
            return contenido
        }
        catch (error) {
            console.log("error de escritura", error)
        }
    }

    async save() {  
        const idfuncion = () => {
            if (contenido.length> 1) {
                let idRecibida = this.id
                idRecibida = id++
            } else {
                idRecibida = this.id
            }
        }
        idfuncion()

        console.log(JSON.stringify(idRecibida))
        console.log(JSON.stringify(this.id))

        // fs.appendFile('./productos.txt', JSON.stringify(idRecibida, null, 2), error => {
        //     if (error) {
        //         throw new Error(`Error en escritura: ${error}`)
        //         }
        //     else {
        //         console.log("escritura exitosa")
        //     }
        // })
    }
    

}


const Contenedor1 = new Contenedor('./productos.txt');

Contenedor1.getAll()

Contenedor1.save({id : 1})