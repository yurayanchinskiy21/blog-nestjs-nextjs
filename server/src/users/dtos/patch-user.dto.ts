import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The ID of the user that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id!: number;
}
