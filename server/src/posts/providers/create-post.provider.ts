import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import type { IActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';

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

      const post = this.postsRepository.create({
        ...createPostDto,
        author,
        tags,
      });

      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
