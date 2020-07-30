
import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import notes from "./notes";
import categories from "./categories";
import products from "./products";
import carts from "./carts";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/notes", notes);
routes.use("/categories", categories);
routes.use("/products", products)
routes.use("/carts", carts)

export default routes;