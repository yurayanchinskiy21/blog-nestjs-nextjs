import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Post()
  public post(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
  @Delete()
  public delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }
  @Delete('soft-delete')
  public softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }
}
