import { Injectable } from "@nestjs/common";
import { getRepository, getTreeRepository } from "typeorm";
import { CommentEntity } from "../../../comments/infrastructure/entities/comment.entity";
import { Post, PostQuery, Posts } from "../../application/queries/post.query";
import { PostEntity } from "../entities/post.entity";

@Injectable()
export class PostQueryImplement implements PostQuery {

    async findById(id: string): Promise<Post> {
        const postEntity = await getRepository(PostEntity).findOne(id);
        const commentEntity = await getTreeRepository(CommentEntity).findTrees();
        const filteredCommentEntity = commentEntity.filter((comment) => comment.idPost !== postEntity);
        return this.convertPostFromEntity(
            postEntity,
            this.orderChildrenByCreatedAt(filteredCommentEntity)
        );
    }

    async find(offset: number, limit: number): Promise<Posts> {
        return this.convertPostsFromEntities(
            await getRepository(PostEntity).find({ skip: offset, take: limit })
        );
    }

    private convertPostsFromEntities(entities: PostEntity[]): Posts {
        return entities.map((entity) => ({
            ...entity,
            comments: entity.comments,
            createdAt: entity.createdAt,
            deletedAt: entity.deletedAt,
        }));
    }

    private convertPostFromEntity(postEntity?: PostEntity, commentEntity?: CommentEntity[]): undefined | Post {
        return postEntity
            ? {
                ...postEntity,
                comments: commentEntity ? commentEntity : [],
                createdAt: postEntity.createdAt,
                deletedAt: postEntity.deletedAt
            }
            : undefined;
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