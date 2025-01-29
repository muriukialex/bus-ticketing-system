import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

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

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  seats: string[]; // ["1A", "1B", "1C", "1D", "2A", "2B", "2C", "2D", ..., "11A", "11B", "11C", "11D", "11E"]
}
