import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { User, SharedNote } from './index';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  ownerId: number;
  @ManyToOne(() => User, user => user.notes)
  @JoinColumn({ name: "ownerId" })
  owner: User;

  @OneToMany(() => SharedNote, sharedNote => sharedNote.note)
  shares: SharedNote[];
}