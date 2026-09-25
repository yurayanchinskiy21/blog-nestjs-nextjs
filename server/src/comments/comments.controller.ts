import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth.type.enum';
import { CommentsService } from './providers/comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import type { IActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get('posts/:postId/comments')
  @Auth(AuthType.None)
  public async getComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findAll(postId);
  }
  @Post('posts/:postId/comments')
  public createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @ActiveUser() user: IActiveUserData,
  ) {
    return this.commentsService.create(createCommentDto, user.sub, postId);
  }
}
