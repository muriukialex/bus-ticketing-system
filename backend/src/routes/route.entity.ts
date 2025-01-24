import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  origin: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  destination: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  distance: number;
}
