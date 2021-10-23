import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeletePostCommand } from "./delete-post.command";

import { PostRepository } from "../../domain/repository";
import { PostRepositoryImplement } from "../../infrastructure/repositories/post.repository";
import { Inject, NotFoundException } from "@nestjs/common";
import { ErrorMessage } from "../../domain/error";

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand, void> {
    
    constructor(
        @Inject(PostRepositoryImplement) private readonly postRepository: PostRepository,
    ) {}
    
    async execute(command: DeletePostCommand): Promise<void> {
        const post = await this.postRepository.findById(command.id);

        if (!post) throw new NotFoundException(ErrorMessage.POST_IS_NOT_FOUND);

        await this.postRepository.softRemove(command.id);
    }
}
