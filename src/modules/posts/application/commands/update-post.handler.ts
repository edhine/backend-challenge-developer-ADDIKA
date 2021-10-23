import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { PostRepository } from "../../domain/repository";
import { PostRepositoryImplement } from "../../infrastructure/repositories/post.repository";
import { Inject, NotFoundException } from "@nestjs/common";
import { ErrorMessage } from "../../domain/error";
import { UpdatePostCommand } from "./update-post.command";

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand, void> {
    
    constructor(
        @Inject(PostRepositoryImplement) private readonly postRepository: PostRepository,
    ) {}
    
    async execute(command: UpdatePostCommand): Promise<void> {
        const post = await this.postRepository.findById(command.id);
        if (!post) throw new NotFoundException(ErrorMessage.POST_IS_NOT_FOUND);

        post.updatePost(command.name, command.description);
        await this.postRepository.save(post);
    }
}
