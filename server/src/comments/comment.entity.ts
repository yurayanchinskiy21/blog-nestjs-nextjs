import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: 'text',
    nullable: false,
  })
  content!: string;
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  @ManyToOne(() => User, (user) => user.comments)
  user!: User;
  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;
}
