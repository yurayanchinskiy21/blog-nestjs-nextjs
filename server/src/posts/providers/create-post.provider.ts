import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import type { IActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Post } from '../post.entity';
import { postStatus } from '../enums/post-status.enum';

interface IPostgresError {
  code: string;
}

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto, user: IActiveUserData) {
    try {
      const author = await this.usersService.findOneById(user.sub);

      if (!author) {
        throw new NotFoundException('Author not found');
      }

      const tags = await this.tagsService.findMultipleTags(
        createPostDto.tags ?? [],
      );

      const publishOn =
        createPostDto.status === postStatus.REVIEW ||
        createPostDto.status === postStatus.PUBLISHED
          ? new Date()
          : createPostDto.publishOn;

      const post = this.postsRepository.create({
        ...createPostDto,
        publishOn,
        author,
        tags,
      });

      return await this.postsRepository.save(post);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        this.isPostgresError(error.driverError) &&
        error.driverError.code === '23505'
      ) {
        throw new ConflictException('A post with this slug already exists');
      }

      throw error;
    }
  }

  private isPostgresError(error: unknown): error is IPostgresError {
    if (typeof error !== 'object' || error === null) {
      return false;
    }

    return 'code' in error && typeof error.code === 'string';
  }
}
