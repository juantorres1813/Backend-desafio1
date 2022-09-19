const fs = require('fs')

class Contenedor{
    constructor(title,price,thumbnail,id = {}){
        this.title= title;
        this.price= price;
        this.thumbnail= thumbnail;
        this.id = id      
    }

    save() {  
        let idRecibida = this.id
        const idfuncion = () => {
            if (this.id>1) {
                idRecibida = id++
            } else {
                idRecibida = this.id
            }
        }
        idfuncion()

        console.log(JSON.stringify(idRecibida))
        console.log(JSON.stringify(this.id))

        fs.appendFile('./productos.txt', JSON.stringify(idRecibida, null, 2), error => {
            if (error) {
                throw new Error(`Error en escritura: ${error}`)
                }
            else {
                console.log("escritura exitosa")
            }
        })
    }
    

}

const contenedor1 = new Contenedor("Escuadra",123.45,'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png')


contenedor1.save({id:1})