import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUsersDto } from './dtos/create-users-dto';
import { GetUsersDto } from './dtos/get-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth.type.enum';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import type { IActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { PatchMeDto } from './dtos/patch-me.dto';
import { ChangePasswordDto } from './dtos/change-passwords.dto';
import { ChangePasswordProvider } from './providers/change-password.provider';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Provider } from './providers/s3.provider';
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly changePasswordProvider: ChangePasswordProvider,
    private readonly s3Provider: S3Provider,
  ) {}

  @Get('me')
  public getMe(@ActiveUser() user: IActiveUserData) {
    return this.usersService.findOneById(user.sub);
  }

  @Patch('me')
  public updateMe(
    @ActiveUser() user: IActiveUserData,
    @Body() patchMeDto: PatchMeDto,
  ) {
    return this.usersService.updateMe(user.sub, patchMeDto);
  }

  @Patch('me/password')
  public changePassword(
    @ActiveUser() user: IActiveUserData,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.changePasswordProvider.changePassword(
      user.sub,
      changePasswordDto,
    );
  }
  @Post('me/avatar')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['avatar'],
    },
  })
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(
    @ActiveUser() user: IActiveUserData,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const key = `avatars/users/${user.sub}/${file.originalname}`;
    await this.s3Provider.uploadFile(key, file.buffer, file.mimetype);
    const avatarUrl = `https://${process.env.AWS_CLOUDFRONT_URL}/${key}`;
    const updatedUser = await this.usersService.updateAvatar(
      user.sub,
      avatarUrl,
    );
    return { userId: updatedUser.id, avatarUrl: updatedUser.avatarUrl };
  }
  @Get('/{:id}')
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries reutrned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The number of page number that you want the API to return',
    example: 1,
  })
  public getUsers(
    @Param('userId') userId: string,
    @Query() userQuery: GetUsersDto,
  ) {
    return this.usersService.findAll(userQuery, userId);
  }

  @Post()
  // @SetMetadata('authType', 'None')
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  @Post('create-many')
  public createManyUsers(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.createMany(createUsersDto);
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return this.usersService.update(patchUserDto);
  }
}
