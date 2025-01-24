import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  //   @Type(() => Number) // no need for this since within the main.ts we have validation pipe, transformOptions.enableImplicitConversion set as true
  per?: number = 10;

  @IsOptional()
  @IsPositive()
  page?: number = 1;
}
