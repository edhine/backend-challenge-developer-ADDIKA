import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommentFactory } from "../../domain/factory";
import { CreateCommentCommand } from "./create-comment.command";

import { CommentRepositoryImplement } from "../../infrastructure/repositories/comment.repository";
import { CommentRepository } from "../../domain/repository";
import { Inject, NotFoundException } from "@nestjs/common";
import { ErrorMessage } from "../../domain/error";
import { PostRepositoryImplement } from "../../../posts/infrastructure/repositories/post.repository";
import { PostRepository } from "../../../posts/domain/repository";

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand, void> {

    constructor(
        @Inject(CommentRepositoryImplement) private readonly commentRepository: CommentRepository,
        @Inject(PostRepositoryImplement) private readonly postRepository: PostRepository,
        private readonly commentFactory: CommentFactory
    ) { }

    async execute(command: CreateCommentCommand): Promise<void> {

        const findPost = await this.postRepository.findById(command.id);
        if (findPost) {
            const comment = this.commentFactory.createCommentOnPost(
                command.id,
                command.content,
            );
            await this.commentRepository.save(comment);
            return;
        }

        const findComment = await this.commentRepository.findByPostId(command.id);
        if (findComment) {
            const commentChild = this.commentFactory.createCommentOnComment(
                findComment,
                command.content
            );
            await this.commentRepository.save(commentChild);
            return;
        }

        throw new NotFoundException(ErrorMessage.POST_OR_COMMENT_NOT_FOUND);
    }
}