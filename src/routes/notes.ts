import { Router } from "express";
import NoteController from "../controllers/note-controller";

const router = Router();
// registration route
router.post("/", NoteController.createNote);

//login route
router.get("/", NoteController.listNotes);

export default router;