import { Router } from "express";
import ProductController from "../controllers/product-controller";

const router = Router();
// registration route
router.post("", ProductController.createProduct);

//login route
router.get("", ProductController.listProducts);

export default router;