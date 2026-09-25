import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UsersService } from 'src/users/providers/users.service';
import { PostsService } from 'src/posts/providers/posts.service';
import { Comment } from '../comment.entity';
@Injectable()
export class CommentsService {
  constructor(
    private readonly userService: UsersService,
    private readonly postService: PostsService,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}
  public async findAll(postId: number) {
    return this.commentsRepository.find({
      where: {
        post: {
          id: postId,
        },
      },
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async create(
    createCommentDto: CreateCommentDto,
    userId: number,
    postId: number,
  ) {
    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await this.postService.findOneById(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentsRepository.create({
      ...createCommentDto,
      user,
      post,
    });

    const savedComment = await this.commentsRepository.save(comment);

    return this.commentsRepository.findOne({
      where: {
        id: savedComment.id,
      },
      relations: ['user'],
    });
  }
}
