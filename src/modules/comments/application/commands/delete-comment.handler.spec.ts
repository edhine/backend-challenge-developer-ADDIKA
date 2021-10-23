import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CommentRepository } from '../../domain/repository';
import { CommentRepositoryImplement } from '../../infrastructure/repositories/comment.repository';
import { ErrorMessage } from "../../domain/error";
import { DeleteCommentHandler } from './delete-comment.handler';
import { DeleteCommentCommand } from './delete-comment.command';

describe('DeleteCommentHandler', () => {
  let handler: DeleteCommentHandler;
  let repositoryComment: CommentRepository;

  beforeEach(async () => {
    const repoProviderComment: Provider = {
      provide: CommentRepositoryImplement,
      useValue: {},
    };

    const providers: Provider[] = [
      DeleteCommentHandler,
      repoProviderComment,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(DeleteCommentHandler);
    repositoryComment = testModule.get(CommentRepositoryImplement);
  });

  describe('execute', () => {

    it('should be defined', () => {
      expect(handler).toBeDefined();
    });

    it('should be able to delete a comment', async () => {

      repositoryComment.findByPostId = jest.fn().mockResolvedValue({});
      repositoryComment.softRemove = jest.fn().mockResolvedValue(undefined);

      const command = new DeleteCommentCommand('idComment')

      await expect(handler.execute(command)).resolves.toBe(undefined);
      expect(repositoryComment.softRemove).toBeCalledTimes(1);
      expect(repositoryComment.softRemove).toBeCalledWith('idComment');
    });

    it('should throw NotFoundException when comment is not found', async () => {

      repositoryComment.findByPostId = jest.fn().mockResolvedValue(undefined);

      const command = new DeleteCommentCommand('idComment')

      await expect(handler.execute(command)).rejects.toThrowError(ErrorMessage.COMMENT_IS_NOT_FOUND);
    });
  });

});
