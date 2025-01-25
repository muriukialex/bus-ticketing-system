import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateTravellingBusDto } from './create-travelling-bus.dto';

export class PatchTravellingBusDto extends PartialType(CreateTravellingBusDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
