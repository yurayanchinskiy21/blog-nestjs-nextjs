import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUserParamDto } from './dtos/get-post-param.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatchPostDto } from './dtos/patch-post-dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import * as activeUserDataInterface from 'src/auth/interfaces/active-user-data.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth.type.enum';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {} //Injected postsService class
  @Get()
  @Auth(AuthType.None)
  public getPosts(@Query() postQuery: GetPostsDto) {
    return this.postsService.findAll(postQuery);
  }

  @Get('user/:userId')
  @Auth(AuthType.None)
  public getPostsByUser(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    return this.postsService.findAll(postQuery, userId);
  }

  @Get(':id')
  @Auth(AuthType.None)
  public getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOneById(id);
  }
  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response of your post is created successfully',
  })
  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: activeUserDataInterface.IActiveUserData,
  ) {
    console.log(user);
    return this.postsService.create(createPostDto, user);
  }

  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
