import { Router } from "express";
import ProductController from "../controllers/product-controller";
import { Product } from "../entity";

const router = Router();
// registration route
router.post("", ProductController.createProduct);

//login route
router.get("", ProductController.listProducts);

//get single product
router.get(
  "/:id",
  // [checkJwt, checkRole(["ADMIN"])],
  ProductController.listProductById
);

//patch product
router.patch(
  "/:id",
  // [checkJwt, checkRole(["ADMIN"])],
  ProductController.editProduct
);

export default router;