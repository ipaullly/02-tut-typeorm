import { getRepository } from "typeorm";
import { Request, Response} from "express";
import { validate } from "class-validator";

import { User, Note } from "../entity";

class NoteController {
  static createNote = async (req: Request, res: Response) => {
    let { text, ownerId } = req.body;
    if(!(text && ownerId)) {
      res.status(400).send({
        status: 'Fail',
        message: 'Please ensure you have included note, and owner'
      });
    }
    
    let note = new Note();
    const noteRepository = getRepository(Note);
    
    note.text = text;
    note.ownerId = ownerId;

    const errors = await validate(note);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await noteRepository.save(note);
    } catch (error) {
      res.status(401).send();
      return;
    }
    res.status(201).send({
      status: 'Success',
      message: 'Note save successfully'
    });
  }
  static listNotes = async (req: Request, res: Response) => {
    const noteRepository = getRepository(Note);
    const notes = await noteRepository.find({
      select: ["id", "text", "ownerId"] 
    });
    // send the users object
    res.send(notes);
  }
}

export default NoteController;