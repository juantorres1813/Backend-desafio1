import { ContainerMongoDB } from "../../Containers/index.js";
import { ProductModel } from "../../models/index.js";

export class ProductsMongo extends ContainerMongoDB {
    constructor() {
        super({
            name: ProductModel.ProductsCollection,
            schema: ProductModel.ProductSchema,
        });
    }
}