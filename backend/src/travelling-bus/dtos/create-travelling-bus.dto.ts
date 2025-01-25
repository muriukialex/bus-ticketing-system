import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTravellingBusDto {
  @IsInt()
  @IsNotEmpty()
  routeId: number;

  @IsString()
  @IsNotEmpty()
  busName: string;

  @IsNumber()
  @IsNotEmpty()
  busSeats: number;

  @IsDate()
  @IsNotEmpty()
  departureTime: Date;

  @IsDate()
  @IsNotEmpty()
  arrivalTime: Date;

  @IsNumber()
  @IsNotEmpty()
  priceOfTrip: number;
}
