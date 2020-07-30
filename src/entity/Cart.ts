import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne
} from 'typeorm';
import { Product, User } from './index'; 

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  totalQuantity: number;

  @Column({
    nullable: true
  })
  totalPrice: number;

  @ManyToMany(type => Product, product => product.carts, {
    cascade: true
  })
  @JoinTable()
  products: Product[];

  @OneToOne(type => User, user => user.cart)
  user: User;

}
