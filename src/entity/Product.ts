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
  carts: Cart[];

  @Column({
    nullable: true
  })
  length: string;

  @Column({
    nullable: true
  })
  insertable: string;

  @Column({
    nullable: true
  })
  width: string;

  @Column({
    nullable: true
  })
  function: string;

  @Column({
    nullable: true
  })
  volume: string;

  @ManyToMany(() => Category, category => category.products, {
    cascade: true
  })
  @JoinTable()
  categories: Category[];

  @Column({
    nullable: true
  })
  shape: string;

  @Column({
    nullable: true
  })
  feature: string;

  @Column({
    nullable: true
  })
  color: string;

  @Column({
    nullable: true
  })
  brand: string;

  @Column({
    nullable: true
  })
  flavor: string;

  @Column({
    nullable: true
  })
  material: string;

  @Column({
    nullable: true
  })
  texture: string;

  @Column({
    nullable: true
  })
  weight: string;

  @Column({
    nullable: true
  })
  manufacturer: string;

  @Column({
    nullable: true
  })
  batteries: string;
}