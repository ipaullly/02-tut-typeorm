import { Router } from "express";
import AuthController from "../controllers/auth-controller";
import { checkJwt } from "../middlewares/check-jwt";

const router = Router();
// registration route
router.post("/register", AuthController.register);

//login route
router.post("/login", AuthController.login);

//change password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;