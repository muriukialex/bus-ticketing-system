import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetTravellingBusParamDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
