const fs = require('fs')
const express = require('express');
const PORT = 8080;
const app = express();
const server = app.listen(process.env.PORT || PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));

class Contenedor{
    constructor(archivo){
        this.file = archivo
    }

    async getAll() {
        try {
            const archivo = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(archivo)
        }
        catch (error) {
            console.log("error de escritura", error)
            return [];
        }
    }

    async save(obj){
        try {
            const archivo = await this.getAll()
            let nuevoId;
            if (archivo.length === 0) {
                nuevoId = 1;
            } else {
                nuevoId = archivo[archivo.length - 1].id + 1;
            }
            const productoConId = { ...obj, id: nuevoId }
            archivo.push(productoConId);
            await fs.promises.writeFile(this.file, JSON.stringify(archivo, null, 3) )
            console.log("escrito correctamente")
            return nuevoId
            } catch (error) {
                console.log(`Error en escritura `,error)
            }
    }

    async getById(numero) {
        try{
            const archivo = await this.getAll()
            if (numero != null) {
                const foundItem = archivo.filter(x => x.id === Number(numero))
                console.log(foundItem);
                return foundItem
            } else {
                return null
            }
        } catch (error) {
            console.log(`Error en escritura `,error)
        }
    }

    async deleteById(numero) {
        try{
            const archivo = await this.getAll()
            if (numero != null) {
                const foundItem = archivo.filter((x) => x.id !== numero);
                console.log('Elemento borrado exitosamente', foundItem);
                await fs.promises.writeFile(this.file, JSON.stringify(foundItem, null, 3))
            } else {
                return null
            }
        } catch (error) {
            console.log(`Error en escritura `,error)
        }
    }

    async deleteAll() {
        try{
            const archivo = await this.getAll()
            archivo.length = 0
            await fs.promises.writeFile(this.file, JSON.stringify(archivo, null, 3))
            console.log('Array borrado exitosamente')
        } catch (error) {
            console.log(`Error en escritura `,error)
        }
    }
}


const productos = new Contenedor('./productos.txt');


app.get('/productos', async (req, res) => {
    const mostrarProductos = await productos.getAll();
    res.send(mostrarProductos);
})

app.get('/productoRandom', async (req, res) => {
    const prod = await productos.getAll();
    const numeroRandom = Math.floor(Math.random() * prod.length);
    res.send(prod[numeroRandom]);
})

