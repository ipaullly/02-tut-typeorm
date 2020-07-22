import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User, Note } from "./index";

@Entity()
export class SharedNote {
  @PrimaryColumn()
  targetId: number;
  @ManyToOne(() => User, user => user.notesSharedWithYou)
  @JoinColumn({ name: "targetId" })
  target: User;

  @PrimaryColumn()
  senderId: number;
  @ManyToOne(() => User, user => user.notesYouShared)
  @JoinColumn({ name: "senderId" })
  sender: User;

  @PrimaryColumn()
  noteId: number;
  @ManyToOne(() => Note, note => note.shares)
  @JoinColumn({ name: "noteId" })
  note: Note;
}
