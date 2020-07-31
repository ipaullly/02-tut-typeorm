import { Router } from "express";
import ProductController from "../controllers/product-controller";
import { Product } from "../entity";
import { checkJwt } from "../middlewares/check-jwt";
import { checkRole } from "../middlewares/check-role";

const router = Router();
// create product
router.post(
  "",
  [checkJwt, checkRole(["ADMIN"])],
  ProductController.createProduct
);

//get all products
router.get(
  "",
  ProductController.listProducts
);

//get single product
router.get(
  "/:id",
  ProductController.listProductById
);

//patch product
router.patch(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  ProductController.editProduct
);

export default router;