import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a comment',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1024)
  content!: string;
}
