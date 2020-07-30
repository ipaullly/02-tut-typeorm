import { Router } from "express";
import CartController from "../controllers/cart-controller";
import { Product } from "../entity";
import { checkJwt } from "../middlewares/check-jwt";

const router = Router();
// create cart route
router.post("", [checkJwt], CartController.createCart);

// list all carts
router.get("", [checkJwt], CartController.listAll);

// //get single product
// router.get(
//   "/:id",
//   // [checkJwt, checkRole(["ADMIN"])],
//   CartController.listProductById
// );

// //patch product
// router.patch(
//   "/:id",
//   // [checkJwt, checkRole(["ADMIN"])],
//   CartController.editProduct
// );

export default router;