import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetRouteParamDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
