import { getRepository } from "typeorm";
import { Request, Response} from "express";
import { validate } from "class-validator";

import { Product, Category } from "../entity";

class ProductController {
  static createProduct = async (req: Request, res: Response) => {
    let { 
      title, 
      description, 
      productCategories, 
      length,
      insertable,
      width,
      itemFunction,
      feature,
      color
    } = req.body;
    if(!(title && description && productCategories)) {
      res.status(400).send({
        status: 'Fail',
        message: 'Please ensure you have included product info'
      });
    }
    const categoryRepository = getRepository(Category);
    let searchedCategory = [];

    for (let i = 0; i < productCategories.length; i++) {
      const searchValue = await categoryRepository.findOne({
        where: [{ name: productCategories[i] }]
      });
      if (searchValue) {
        searchedCategory.push(searchValue);
      }      
    }
    console.log(searchedCategory, "==]==");
    
    if (!(searchedCategory.length > 0)) {
      res.status(400).send({
        status: 'Fail',
        message: 'Given category doesn\'t exist'
      });
    }
    
    let product = new Product();
    const productRepository = getRepository(Product);
    
    product.title = title;
    product.description = description;
    product.categories = searchedCategory;
    // product.length = length;
    // product.insertable = insertable;
    // product.width = width;
    // product.function = itemFunction;
    // product.volume = '';
    // product.shape = '';
    // product.brand = '';
    // product.manufacturer = '';
    // product.material = '';
    // product.batteries = '';
    // product.flavor = '';
    // product.weight = '';
    // product.texture = '';
    // product.feature = feature;
    // product.color = color;

    const errors = await validate(product);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await productRepository.save(product);
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
      message: 'Product info saved successfully'
    });
  }

  static listProducts = async (req: Request, res: Response) => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find({
      relations: ['categories']
    });
    // send the products object
    res.send(products);
  }

  static listProductById = async (req: Request, res: Response) => {
    // extract id from url parameters
    const id: number = Number(req.params.id);
    const productRepository = getRepository(Product);
    try {
      const product = await productRepository.findOneOrFail(id, {
        relations: ['categories']
      });
      res.status(200).send(product);
    } catch (error) {
      res.status(404).send({
        error: error.message
      })
    }
  };

  static editProduct = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const { categories } = req.body;
    const productRepository = getRepository(Product);
    let product: Product;
    try {
      product = await productRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send({
        error: error.message
      });
      return;
    }

    const categoryRepository = getRepository(Category);
    let searchedCategory = [];

    if (categories && categories.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        const searchValue = await categoryRepository.findOne({
          where: [{ name: categories[i] }]
        });
        if (searchValue) {
          searchedCategory.push(searchValue);
        }      
      }
    }

    let updatedProduct = {
      ...product,
      ...req.body,
      categories: searchedCategory
    };

    const errors = await validate(updatedProduct);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // try to save, will exit with an error
    try {
      console.log(updatedProduct);
      await productRepository.save(updatedProduct);
    } catch (e) {
      res.status(409).send({
        error: e.message
      });
      return;
    }
    // after all send a 204 (no content , but accepted) response
    res.status(204).send();
  };

  static deleteProduct = async (req: Request, res: Response) => {
    // get id from url
    const id = req.params.id;
    const productRepository = getRepository(Product);
    let product: Product;
    try {
      product = await productRepository.findOneOrFail(id)
    } catch (e) {
      res.status(404).send("Product not found");
      return;
    }
    productRepository.delete(id);
    // after all send a 204 - no content but accepted response
    res.status(204).send();
  };
}

export default ProductController;