import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateNewRouteDto {
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsInt()
  @IsNotEmpty()
  distance: number;
}
