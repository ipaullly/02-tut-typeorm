import { getRepository } from "typeorm";
import { Request, Response} from "express";
import { validate } from "class-validator";

import { Cart, User, Product } from "../entity";

class CartController {
  static createCart = async (req: Request, res: Response) => {
    let { totalQuantity, totalPrice, products } = req.body;
    if(!(totalPrice && totalQuantity && products)) {
      res.status(400).send({
        status: 'Fail',
        message: 'Please ensure you have selected cart items before making order'
      });
    }
    const productRepository = getRepository(Product);
    let selectedProducts = [];

    for (let i = 0; i < products.length; i++) {
      const searchValue = await productRepository.findOne({
        where: [{ id: products[i] }]
      });
      if (searchValue) {
        selectedProducts.push(searchValue);
      }      
    }
    
    if (!(selectedProducts.length > 0)) {
      res.status(400).send({
        status: 'Fail',
        message: 'Provided item ids don\'t exist in the store catalogue'
      });
    }

    let cart = new Cart();
    const cartRepository = getRepository(Cart);

    cart.totalPrice = totalPrice;
    cart.totalQuantity = totalQuantity;
    cart.products = selectedProducts;

    const errors = await validate(cart);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await cartRepository.save(cart);
    } catch (error) {
      console.log(error);
      res.status(401).send({
        status: "fail",
        messsage: error.message
      });
      return;
    }
    // get id from jwt
    const id = res.locals.jwtPayload.userId;

    // get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }
    user.cart = cart;

    try {
      await userRepository.save(user);
    } catch (error) {
      console.log(error);
      res.status(401).send({
        status: "fail",
        messsage: error.message
      });
      return;
    }

    res.status(201).send({
      status: 'Success',
      message: 'cart info saved successfully'
    });
  };

  static listAll = async (req: Request, res: Response) => {
    // get users from the database
    const cartRepository = getRepository(Cart);
    const carts = await cartRepository.find({
      relations: ['user', 'products']
    });
    // send the users object
    res.status(200).send(carts);
  };
}

export default CartController;