import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './providers/comments.service';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [UsersModule, PostsModule, TypeOrmModule.forFeature([Comment])],
  exports: [CommentsService],
})
export class CommentsModule {}
