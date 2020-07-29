import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //retrieve token from request header
  const token = <string>req.headers["auth"];
  let jwtPayload;
  // try validating the token and get the data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //if token is not valid, respond with a 401
    res.status(401).send({
      message: 'Your are not authorized to access this route'
    });
    return;
  }

  // token valid for 1 hour
  // we set a new token with every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "24h"
  });
  res.setHeader("token", newToken);

  // call the next middleware
  next();
};