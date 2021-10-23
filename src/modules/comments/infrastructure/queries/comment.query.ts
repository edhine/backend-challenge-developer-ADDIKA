import { getManager, getRepository, getTreeRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Comment, CommentQuery, Comments } from '../../application/queries/comment.query';
import { CommentEntity } from '../entities/comment.entity';
import { PostEntity } from '../../../posts/infrastructure/entities/post.entity';

@Injectable()
export class CommentQueryImplement implements CommentQuery {

    async findByPostId(idPost: string): Promise<undefined | Comments> {
        const postEntity = await getRepository(PostEntity).findOne(idPost);
        const commentEntity = await getTreeRepository(CommentEntity).findTrees();
        const filteredCommentEntity = commentEntity.filter((comment) => comment.idPost !== postEntity);
        
        return this.convertCommentsFromEntities(
            this.orderChildrenByCreatedAt(filteredCommentEntity)
        );
    }

    async find(): Promise<Comments> {
        const manager = getManager();
        return this.convertCommentsFromEntities(
            this.orderChildrenByCreatedAt(await manager.getTreeRepository(CommentEntity).findTrees())
        );
    }

    private convertCommentFromEntity(
        entity?: CommentEntity,
    ): undefined | Comment {
        return entity
            ? {
                ...entity,
                createdAt: entity.createdAt,
                deletedAt: entity.deletedAt
            }
            : undefined;
    }

    private convertCommentsFromEntities(entities: CommentEntity[]): Comments {
        return entities.map((entity) => ({
            ...entity,

            openedAt: entity.createdAt,
            closedAt: entity.deletedAt,
        }));
    }

    private orderChildrenByCreatedAt(array: CommentEntity[]): CommentEntity[] {
        if (array.length === 0)
            return array;

        const orderedArray = [];
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.childrenComment.length > 0) {
                element.childrenComment = this.orderChildrenByCreatedAt(element.childrenComment);
            }
            orderedArray.push(element);
        }
        orderedArray.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        return orderedArray;
    }

}
