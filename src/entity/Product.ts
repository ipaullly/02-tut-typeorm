import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Cart, Category } from './index';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(type => Cart, cart => cart.products)
  carts?: Cart[];

  @Column()
  length?: string;

  @Column()
  insertable?: string;

  @Column()
  width?: string;

  @Column()
  function?: string;

  @Column()
  volume?: string;

  @ManyToMany(() => Category, category => category.products, {
    cascade: true
  })
  @JoinTable()
  categories?: Category[];

  @Column()
  shape?: string;

  @Column()
  feature?: string;

  @Column()
  color?: string;

  @Column()
  brand?: string;

  @Column()
  flavor?: string;

  @Column()
  material?: string;

  @Column()
  texture?: string;

  @Column()
  weight?: string;

  @Column()
  manufacturer?: string;

  @Column()
  batteries?: string;
}