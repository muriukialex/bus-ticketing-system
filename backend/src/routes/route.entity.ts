import { TravellingBus } from 'src/travelling-bus/travelling-bus.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => TravellingBus, (travellingBus) => travellingBus.route)
  travellingBuses: TravellingBus[];
}
