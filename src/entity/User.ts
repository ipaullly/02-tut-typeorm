import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Note } from './Note';
import { SharedNote } from './SharedNote';

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @OneToMany(() => Note, note => note.owner)
  notes: Note[];

  @OneToMany(() => SharedNote, sharedNote => sharedNote.target)
  notesSharedWithYou: Note[];
  
  @OneToMany(() => SharedNote, sharedNote => sharedNote.sender)
  notesYouShared: Note[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
