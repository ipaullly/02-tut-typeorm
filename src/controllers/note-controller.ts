import { getRepository } from "typeorm";
import { Request, Response} from "express";
import { validate } from "class-validator";

import { User } from "../entity";

class NoteController {
  static createNote = async (req: Request, res: Response) => {

  }
  static listNotes = async (req: Request, res: Response) => {
    
  }
}

export default NoteController;