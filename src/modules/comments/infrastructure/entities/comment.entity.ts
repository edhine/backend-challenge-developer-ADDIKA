import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { PostEntity } from '../../../posts/infrastructure/entities/post.entity';
import { BaseEntity } from './base.entity';

@Tree("closure-table", {
  closureTableName: "comment",
  ancestorColumnName: (column) => "ancestor_" + column.propertyName,
  descendantColumnName: (column) => "descendant_" + column.propertyName
})
@Entity('comment')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', default: '' })
  content: string;
  
  @ManyToOne(type => PostEntity, post => post.comments, {  
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: "idPost" })
  idPost: PostEntity;

  @TreeChildren({ cascade: true })
  childrenComment: CommentEntity[];

  @TreeParent({ onDelete: 'CASCADE' })
  parentComment: CommentEntity;
}
