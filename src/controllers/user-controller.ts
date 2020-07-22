import { getRepository } from "typeorm";
import { Request, Response} from "express";
import { validate } from "class-validator";

import { User } from "../entity";

class UserController {
  
  static listAll = async (req: Request, res: Response) => {
    // get users from the database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id", "username", "role"] // we don't want to include passwords in the response body
    });
    // send the users object
    res.send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    // Get the ID from the url
    const id: any = req.params.id;

    // get the user from database
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"] //  we don't need the password in the response body
      });
    } catch (error) {
      res.status(404).send("User not found oya!");
    }
  };

  static editUser = async (req: Request, res: Response) => {
    // Get id from req url
    const id = req.params.id;
    // get values from the body
    const { username, role } = req.body;

    // try to find user on database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      // if not found, send a 404 response
      res.status(404).send("User not found oink!");
      return;
    }

    //validate the new values from req body
    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // try to save, will exit with an error
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }
    // after all send a 204 (no content , but accepted) response
    res.status(204).send();
  };

  static deleteUser = async (req: Request, res: Response) => {
    // get id from url
    const id = req.params.id;
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (e) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);
    // after all send a 204 - no content but accepted response
  };
  
};

export default UserController;