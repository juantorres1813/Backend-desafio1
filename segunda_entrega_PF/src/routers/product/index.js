import { Router } from "express";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { ProductController } from "../../controllers/index.js";

const router = Router();

router.get("/", ProductController.getAll)

router.get("/:id?", ProductController.getById)

router.post("/", verifyRole, ProductController.createProduct)

router.delete("/:id", verifyRole, ProductController.deleteById)

router.put("/:id", verifyRole, ProductController.updateById)

export { router as ProductRouter };