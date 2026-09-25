import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

import { IntersectionType } from '@nestjs/swagger';

import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

enum PostSortBy {
  TITLE = 'title',
  PUBLISH_ON = 'publishOn',
}

enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

class GetPostsBaseDto {
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(PostSortBy)
  @IsOptional()
  sortBy?: PostSortBy;

  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder;

  @IsOptional()
  tags?: string;
}

export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
