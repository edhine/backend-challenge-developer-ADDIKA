import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PostFactory } from "../../domain/factory";
import { CreatePostCommand } from "./create-post.command";
import { PostRepositoryImplement } from "../../infrastructure/repositories/post.repository";
import { Inject } from "@nestjs/common";
import { PostRepository } from "../../domain/repository";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand, void> {
    
    constructor(
        @Inject(PostRepositoryImplement)
        private readonly postRepository: PostRepository,
        private readonly postFactory: PostFactory
    ) {}
    
    async execute(command: CreatePostCommand): Promise<void> {
        const post = this.postFactory.create(
            command.name,
            command.description
        );

        await this.postRepository.save(post);
    }
}
