import { Router } from "express";
import { CartController } from "../../controllers/index.js";

const router = Router();

router.post("/", CartController.saveCart)

router.post("/:cartId/products", CartController.postById)

router.delete("/:id/products/:id_prod", CartController.deleteById)

router.get('/:id/products', CartController.getById)

router.delete("/:id", CartController.deleteById2)

export { router as CartRouter };