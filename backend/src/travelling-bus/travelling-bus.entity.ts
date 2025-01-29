import { Booking } from 'src/booking/booking.entity';
import { Route } from 'src/routes/route.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TravellingBus {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Route, (route) => route.travellingBuses, { eager: true })
  route: Route;

  @OneToMany(() => Booking, (booking) => booking.travellingBus)
  booking: Booking;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
    unique: true,
  })
  busName: string;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  busSeats: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  departureTime: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  arrivalTime: Date;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  priceOfTrip: number;

  @Column({
    type: 'simple-array',
    nullable: false,
  })
  seats: string[]; // ["1A", "1B", "1C", "1D", "2A", "2B", "2C", "2D", ..., "11A", "11B", "11C", "11D", "11E"]
}
