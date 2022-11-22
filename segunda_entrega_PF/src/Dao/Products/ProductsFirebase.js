import {ContainerFirebase} from "../../Containers/index.js"

class ProductsFirebase extends ContainerFirebase {
    constructor() {
        super("products")
    }
}

export {ProductsFirebase}