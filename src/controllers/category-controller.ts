import { getRepository } from "typeorm";
import { Request, Response} from "express";
import { validate } from "class-validator";

import { Category } from "../entity";

class CategoryController {
  static createCategory = async (req: Request, res: Response) => {
    let { name } = req.body;
    if(!name) {
      res.status(400).send({
        status: 'Fail',
        message: 'Please ensure you have included product info'
      });
    }
    
    let category = new Category();
    const categoryRepository = getRepository(Category);
    
    category.name = name;

    const errors = await validate(category);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await categoryRepository.save(category);
    } catch (error) {
      res.status(401).send();
      return;
    }
    res.status(201).send({
      status: 'Success',
      message: 'Category saved successfully'
    });
  }
  static listCategories = async (req: Request, res: Response) => {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find({
      relations: ['products']
    });
    // send the products object
    res.send(categories);
  }
}

export default CategoryController;