import { Router } from "express";
import CategoryController from "../controllers/category-controller";

const router = Router();
// registration route
router.post("/", CategoryController.createCategory);

//login route
router.get("/", CategoryController.listCategories);

export default router;