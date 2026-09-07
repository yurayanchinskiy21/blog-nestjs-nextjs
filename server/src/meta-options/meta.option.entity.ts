import { Post } from 'src/posts/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'json',
    nullable: false,
  })
  metaValue!: string;

  @CreateDateColumn()
  createDate!: string;

  @UpdateDateColumn()
  updateDate!: string;

  @OneToOne(() => Post, (post) => post.metaOptions, {
    onDelete: 'CASCADE',
  })
  post!: Post;
}
