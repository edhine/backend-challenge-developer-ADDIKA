import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { Inject, NotFoundException } from "@nestjs/common";
import { ErrorMessage } from "../../domain/error";
import { DeleteCommentCommand } from "./delete-comment.command";
import { DeletePostCommand } from "../../../posts/application/commands/delete-post.command";
import { CommentRepositoryImplement } from "../../infrastructure/repositories/comment.repository";
import { CommentRepository } from "../../domain/repository";

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler implements ICommandHandler<DeleteCommentCommand, void> {
    
    constructor(
        @Inject(CommentRepositoryImplement) private readonly commentRepository: CommentRepository,
    ) {}
    
    async execute(command: DeletePostCommand): Promise<any> {

        const findComment = await this.commentRepository.findByPostId(command.id);
        if (!findComment) throw new NotFoundException(ErrorMessage.COMMENT_IS_NOT_FOUND);
        
        await this.commentRepository.softRemove(command.id);
    }
}
