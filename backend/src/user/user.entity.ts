import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 120,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 120,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 120,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;
}
