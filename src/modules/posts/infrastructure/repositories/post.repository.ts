import { Inject, Injectable } from "@nestjs/common";
import { getManager, getRepository } from "typeorm";
import { CommentEntity } from "../../../comments/infrastructure/entities/comment.entity";
import { PostFactory } from "../../domain/factory";
import { Post } from "../../domain/post";
import { PostRepository } from "../../domain/repository";
import { PostEntity } from "../entities/post.entity";

@Injectable()
export class PostRepositoryImplement implements PostRepository {

  constructor(
    @Inject(PostFactory) private readonly postFactory: PostFactory
  ) { }

  async save(data: Post | Post[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await getRepository(PostEntity).save(entities);
  }

  async findById(id: string): Promise<Post> {
    const entity = await getRepository(PostEntity).findOne(id);
    return entity ? this.entityToModel(entity) : null;
  }

  async softRemove(id: string, removeComments: boolean = true): Promise<void> {
    const postRepo = getManager().getRepository(PostEntity);

    if (removeComments) {
      const treeCommentRepo = getManager().getTreeRepository(CommentEntity);
      const searchTree = await treeCommentRepo.findOne({ where: { idPost: id } });
      if (searchTree) {
        const searchTreeChild = await treeCommentRepo.findDescendantsTree(searchTree);
        await treeCommentRepo.softRemove(searchTreeChild);
      }
    }
    await postRepo.softRemove({ id });
  };

  private modelToEntity(model: Post): PostEntity {
    const properties = model.properties();
    return {
      ...properties,
      createdAt: properties.createdAt,
      deletedAt: properties.deletedAt,
    };
  }

  private entityToModel(entity: PostEntity): Post {
    return this.postFactory.reconstitute({
      ...entity,
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
    });
  }
}