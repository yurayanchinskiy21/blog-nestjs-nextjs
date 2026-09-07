import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateUsersDto } from '../dtos/create-users-dto';
import { GetUsersDto } from '../dtos/get-users.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from 'src/users/providers/find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { IGoogleUser } from '../interfaces/google-user.interface';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly paginationProvider: PaginationProvider,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }
  /**
   * The method to create a transaction to push all users from an array in database
   */
  public async createMany(createUsersDto: CreateUsersDto) {
    return await this.usersCreateManyProvider.createMany(createUsersDto);
  }
  /**
   * The method to get all users from database
   */
  // public async findAll() {
  //   const users = await this.usersRepository.find();

  //   return users;
  // }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  public async findAll(
    postQuery: GetUsersDto,
    userId: string,
  ): Promise<Paginated<User>> {
    const users = await this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.usersRepository,
    );

    return users;
  }

  /**
   *  A method for finding a single user by userId
   */
  public async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User with this id was not found', {
        description: 'Id not found',
      });
    }

    return user;
  }
  public async update(patchUserDto: PatchUserDto) {
    const user = await this.findOneById(patchUserDto.id);

    if (!user) {
      throw new Error('User not found');
    }

    user.firstName = patchUserDto.firstName ?? user.firstName;
    user.lastName = patchUserDto.lastName ?? user.lastName;
    user.email = patchUserDto.email ?? user.email;
    user.password = patchUserDto.password ?? user.password;

    return await this.usersRepository.save(user);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: IGoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
