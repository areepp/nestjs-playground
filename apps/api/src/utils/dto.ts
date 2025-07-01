import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class InfinitePaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  cursor: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number = 10;
}
