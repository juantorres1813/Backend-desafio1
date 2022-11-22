import { ProductDao } from "../../Dao/index.js";
import {
    DATE_UTILS,
    ERRORS_UTILS,
    JOI_VALIDATOR,
    LOGGER_UTILS,
} from "../../utils/index.js";


const getAll = async (req, res) => {
    try {
        const product = await ProductDao.getAll();

        if (!product) {
            return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
        }

        res.send(product);
    } catch (error) {
        res.send({ error: "Internal server error" });
    }
};


const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductDao.getById(id);

        if (req.params.id == undefined) return res.send(ProductDao.getAll());

        if (!product) {
            return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
        }

        res.send(product);
    } catch (error) {
        res.send({ error: "Internal server error" });
    }
};


const createProduct = async (req, res) => {
    try {
        const { title, description, code, thumbnail, price, stock } = req.body;

        const product = await JOI_VALIDATOR.product.validateAsync({
            title,
            description,
            code,
            thumbnail,
            price,
            stock,
            timestamp: DATE_UTILS.getTimestamp(),
        });

        const createdProduct = await ProductDao.save(product);

        res.send(createdProduct);
    } catch (error) {
        await LOGGER_UTILS.addLog(error);
        res.send(error);
    }
};

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;

        const productDeleted = await ProductDao.deleteById(id);

        if (productDeleted === -1) return res.status(404).json({ message: 'El ID no pertenece a un producto listado' });

        if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });

        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.send({ error: "Ocurrio un error" });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;

    const item = await ProductDao.updateById1((id), req.body);

    if (item) {
        res.send({ item })
    } else {
        return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
    }

}

export const ProductController = {
    getAll,
    getById,
    createProduct,
    deleteById,
    updateById,
}