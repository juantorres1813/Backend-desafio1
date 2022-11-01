import { Router } from "express";
import { ProductDao } from "../../Dao/index.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import {
    DATE_UTILS,
    ERRORS_UTILS,
    JOI_VALIDATOR,
    LOGGER_UTILS,
} from "../../utils/index.js";

const router = Router();

// /api/products

router.get("/", async (req, res) => {
    try {
        const product = await ProductDao.getAll();

        if (!product) {
            return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
        }

        res.send(product);
    } catch (error) {
        res.send({ error: "Internal server error" });
    }
});


router.get("/:id?", async (req, res) => {
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
});


router.post("/", verifyRole, async (req, res) => {
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
});

router.delete("/:id", verifyRole, async (req, res) => {
    try {
        const { id } = req.params;

        const productDeleted = await ProductDao.deleteById(Number(id));

        if (productDeleted === -1) return res.status(404).json({ message: 'El ID no pertenece a un producto listado' });

        if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });

        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.send({ error: "Ocurrio un error" });
    }
});

router.put("/:id", verifyRole, async (req, res) => {
    const { id } = req.params;

    const item = await ProductDao.updateById1((Number(id)), req.body);

    if (item) {
        res.send({ item })
    } else {
        return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
    }

})

export { router as ProductRouter };