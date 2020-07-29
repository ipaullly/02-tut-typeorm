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
    product.length = length;
    product.insertable = insertable;
    product.width = width;
    product.function = itemFunction;
    product.volume = '';
    product.shape = '';
    product.brand = '';
    product.manufacturer = '';
    product.material = '';
    product.batteries = '';
    product.flavor = '';
    product.weight = '';
    product.texture = '';
    product.feature = feature;
    product.color = color;

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
}

export default ProductController;