import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  // what do you need to book a vehicle for travelling?
  @IsInt()
  @IsNotEmpty()
  // who booked the vehicle
  userId: number;

  @IsInt()
  @IsNotEmpty()
  // which vehicle is being booked
  travellingBusId: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  // seat numbers that are been booked
  seatNumbers: string[];
}
