import { Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta.option.entity';
import { TagsService } from 'src/tags/tags.service';
import { PatchPostDto } from '../dtos/patch-post-dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import type { IActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreatePostProvider } from './create-post.provider';

@Injectable()
export class PostsService {
  /**
   * Injecting Users Service
   */
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
    private readonly tagsService: TagsService,
    private readonly paginationProvider: PaginationProvider,
    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /**
   * Creating new posts
   */
  public async create(
    @Body() createPostDto: CreatePostDto,
    user: IActiveUserData,
  ) {
    return this.createPostProvider.create(createPostDto, user);
  }

  /**
   * Find all posts
   */
  public async findAll(
    postQuery: GetPostsDto,
    userId?: string,
  ): Promise<Paginated<Post>> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'publishOn',
      sortOrder = 'DESC',
      startDate,
      endDate,
      tags,
    } = postQuery;

    const query = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.metaOptions', 'metaOptions')
      .leftJoinAndSelect('post.comments', 'comment');

    if (userId) {
      query.andWhere('author.id = :userId', {
        userId: Number(userId),
      });
    }

    if (search) {
      query.andWhere(
        '(post.title ILIKE :search OR post.content ILIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (startDate) {
      query.andWhere('post.publishOn >= :startDate', {
        startDate,
      });
    }

    if (endDate) {
      query.andWhere('post.publishOn <= :endDate', {
        endDate,
      });
    }

    if (tags) {
      const tagIds = tags.split(',').map(Number);

      query.andWhere('tag.id IN (:...tagIds)', {
        tagIds,
      });
    }

    if (sortBy === 'publishOn') {
      query.orderBy(`post.${sortBy}`, sortOrder, 'NULLS LAST');
    } else {
      query.orderBy(`post.${sortBy}`, sortOrder);
    }

    query.skip((page - 1) * limit).take(limit);

    const [data, totalItems] = await query.getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      meta: {
        itemsPerPage: limit,
        totalItems,
        currentPage: page,
        totalPages,
      },
      links: {
        first: `?page=1&limit=${limit}`,
        last: `?page=${totalPages}&limit=${limit}`,
        current: `?page=${page}&limit=${limit}`,
        next: page < totalPages ? `?page=${page + 1}&limit=${limit}` : '',
        previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : '',
      },
    };
  }

  // public async findAll(
  //   postQuery: GetPostsDto,
  //   userId?: string,
  // ): Promise<Paginated<Post>> {
  //   const where = userId
  //     ? ({
  //         author: {
  //           id: Number(userId),
  //         },
  //       } as FindOptionsWhere<Post>)
  //     : undefined;

  //   return this.paginationProvider.paginateQuery(
  //     {
  //       limit: postQuery.limit,
  //       page: postQuery.page,
  //     },
  //     this.postsRepository,
  //     where,
  //   );
  // }

  public async findOneById(id: number) {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'tags', 'metaOptions', 'comments'],
    });
  }

  public async update(patchPostDto: PatchPostDto) {
    const tags = await this.tagsService.findMultipleTags(
      patchPostDto.tags ?? [],
    );

    const post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    if (!post) {
      throw new Error('Post not found');
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn
      ? new Date(patchPostDto.publishOn)
      : post.publishOn;
    post.tags = tags;

    try {
      await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return post;
  }

  public async delete(id: number) {
    // const post = await this.postsRepository.findOneBy({ id });

    // if (!post) {
    //   return;
    // }
    await this.postsRepository.delete(id);

    // if (post.metaOptions) {
    //   await this.metaOptionsRepository.delete(post.metaOptions.id);
    // }
    return { deleted: true, id };
  }
}
