import { DATE_UTILS, ERRORS_UTILS } from "../../utils/index.js";
import { CartDao, ProductDao } from "../../Dao/index.js";

const saveCart = async (req, res) => {
    const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

    const cart = await CartDao.save(baseCart);

    res.send({ success: true, cartId: cart.id });
};


const postById = async (req, res) => {
    const { productId } = req.body;
    const { cartId } = req.params;

    const cart = await CartDao.getById(cartId);

    if (!cart)
        return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });

    const product = await ProductDao.getById(productId);

    if (!product)
        return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

    // TODO
    cart.products.push(product);

    const updatedCart = await CartDao.updateById(cartId, cart);

    res.send({ success: true, cart: updatedCart });
};

const deleteById = async (req, res) => {
    const { id, id_prod } = req.params;

    const cart = await CartDao.getById(id);

    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
        return;
    }

    cart.products = cart.products.filter(product =>
        product.id !== id_prod
    );

    await CartDao.updateById(cart);

    res.json({
        mensaje: 'Producto eliminado del carrito',
        productos: cart.products
    });
}


const getById = async (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });

    const cartSelected = await CartDao.getById(id);

    if (cartSelected == null) return res.status(404).send({ message: 'Ingresa el ID de un carrito listado' });

    res.send({ cartSelected });
}

const deleteById2 = async (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });

    const cartDeleted = await CartDao.deleteById(id);

    if (cartDeleted === -1) return res.status(404).send({ message: 'El ID no pertenece a un carrito listado' });

    res.send({ message: 'Carrito eliminado' });
}


export const CartController = {
    saveCart,
    deleteById,
    deleteById2,
    getById,
    postById
}