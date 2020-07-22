import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity";
import config from "../config/config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    // check if username and pasword are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }
    // get user from the db
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send();
    }

    // check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    // sign  jwt valid for one hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      {expiresIn: "1h"}
    )

    // send the jwt in the response
    res.send(token);
  };

  static register = async (req: Request, res: Response) => {
    let { username, password, role } = req.body;
    if(!(username && password && role)) {
      res.status(400).send()
    }
    let user = new User();
    user.username = username;
    user.password = password;
    user.hashPassword();
    user.role = role;
    const userRepository = getRepository(User);

    try {
      await userRepository.save(user);
    } catch (error) {
      res.status(401).send(error);
    }
    res.status(201).send();
  };

  static changePassword = async (req: Request, res: Response) => {
    // Get ID from jwt
    const id = res.locals.jwtPayload.userId;

    // get parameters from the req body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    // get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matches
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)){
      res.status(401).send();
      return;
    }

    // validate the password length
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}

export default AuthController;