import { TravellingBus } from 'src/travelling-bus/travelling-bus.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingStatus } from './enums/booking-status.enum';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => TravellingBus, (travellingBus) => travellingBus.booking, {
    cascade: true,
    eager: true,
  })
  travellingBus: TravellingBus;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  seatNumber: string;

  @CreateDateColumn()
  timeBooked: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.BOOKED,
    nullable: true,
  })
  bookingStatus: BookingStatus;
}
