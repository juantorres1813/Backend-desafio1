import { Router } from "express";
import { DATE_UTILS, ERRORS_UTILS } from "../../utils/index.js";
import { CartDao, ProductDao } from "../../Dao/index.js";

const router = Router();

router.post("/", async (req, res) => {
    const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

    const cart = await CartDao.save(baseCart);

    res.send({ success: true, cartId: cart.id });
});

// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

router.post("/:cartId/products", async (req, res) => {
    const { productId } = req.body;
    const { cartId } = req.params;

    const cart = await CartDao.getById(Number(cartId));

    if (!cart)
        return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });

    const product = await ProductDao.getById(Number(productId));

    if (!product)
        return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

    // TODO
    cart.products.push(product);

    const updatedCart = await CartDao.updateById1(Number(cartId), cart);

    res.send({ success: true, cart: updatedCart });
});

router.delete("/:id/products/:id_prod", async (req, res) => {
    const { id, id_prod } = req.params;

    const cart = await CartDao.getById(Number(id));

    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
        return;
    }

    cart.products = cart.products.filter(product =>
        product.id !== Number(id_prod)
    );

    await CartDao.updateById2(cart);

    res.json({
        mensaje: 'Producto eliminado del carrito',
        productos: cart.products
    });
})


router.get('/:id/products', async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });

    const cartSelected = await CartDao.getById(id);

    if (cartSelected == null) return res.status(404).send({ message: 'Ingresa el ID de un carrito listado' });

    res.send({ cartSelected });
})

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });

    const cartDeleted = await CartDao.deleteById(id);

    if (cartDeleted === -1) return res.status(404).send({ message: 'El ID no pertenece a un carrito listado' });

    res.send({ message: 'Carrito eliminado' });
})

export { router as CartRouter };