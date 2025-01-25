import { Booking } from 'src/booking/booking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  joinedOn: Date;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
