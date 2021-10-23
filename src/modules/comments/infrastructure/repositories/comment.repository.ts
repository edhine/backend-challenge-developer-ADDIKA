import { Inject } from "@nestjs/common";
import { getManager, getRepository } from "typeorm";
import { Comment } from "../../domain/comment";
import { CommentFactory } from "../../domain/factory";
import { CommentRepository } from "../../domain/repository";
import { CommentEntity } from "../entities/comment.entity";

export class CommentRepositoryImplement implements CommentRepository {

    constructor(
        @Inject(CommentFactory) private readonly commentFactory: CommentFactory
    ) { }

    async findByPostId(id: string): Promise<Comment> {
        const entity = await getRepository(CommentEntity).findOne(id);
        return entity ? this.entityToModel(entity) : null;
    }

    async save(data: Comment | Comment[]): Promise<void> {
        const models = Array.isArray(data) ? data : [data];
        const entities = models.map((model) => this.modelToEntity(model));
        await getRepository(CommentEntity).save(entities);
    }

    async softRemove(id: string, removeChildren: boolean = true): Promise<void> {
        const commentRepo = getManager().getRepository(CommentEntity);

        if (removeChildren) {
            const treeCommentRepo = getManager().getTreeRepository(CommentEntity);
            const searchTree = await treeCommentRepo.findOne({ where: { parentComment: id } });
            if (searchTree) {
                const searchTreeChild = await treeCommentRepo.findDescendantsTree(searchTree);
                await treeCommentRepo.softRemove(searchTreeChild);
            }
        }
        await commentRepo.softRemove({ id });
    }

    private modelToEntity(model: Comment): CommentEntity {
        const properties = model.properties();
        return {
            ...properties,
            createdAt: properties.createdAt,
            deletedAt: properties.deletedAt,
        };
    }

    private entityToModel(entity: CommentEntity): Comment {
        return this.commentFactory.reconstitute({
            ...entity,
            createdAt: entity.createdAt,
            deletedAt: entity.deletedAt,
        });
    }
}