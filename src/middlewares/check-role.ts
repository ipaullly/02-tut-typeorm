import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../entity";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // get user id from previous middleware
    const id = res.locals.jwtPayload.userId;
    // get user role from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }
    // Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send({
      message: "unauthorized access of route"
    });
  }
}