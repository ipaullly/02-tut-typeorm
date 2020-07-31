import { Router } from "express";
import CategoryController from "../controllers/category-controller";
import { checkRole } from "../middlewares/check-role";
import { checkJwt } from "../middlewares/check-jwt";

const router = Router();
// create category
router.post(
  "",
  [checkJwt, checkRole(["ADMIN"])],
  CategoryController.createCategory
);

//get categories
router.get(
  "",
  CategoryController.listCategories
);

export default router;