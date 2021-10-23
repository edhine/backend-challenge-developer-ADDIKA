import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from '../../../comments/infrastructure/entities/comment.entity';
import { BaseEntity } from './base.entity';


@Entity('post')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', default: '' })
  name: string;

  @Column({ type: 'varchar', default: '' })
  description: string;
  
  @OneToMany(() => CommentEntity, comment => comment.idPost, {
    onDelete: 'CASCADE',
    cascade: true
  })
  comments?: CommentEntity[];
}
