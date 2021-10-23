import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PostRepository } from '../../../posts/domain/repository';
import { PostRepositoryImplement } from '../../../posts/infrastructure/repositories/post.repository';
import { CommentFactory } from '../../domain/factory';
import { CommentRepository } from '../../domain/repository';
import { CommentRepositoryImplement } from '../../infrastructure/repositories/comment.repository';
import { CreateCommentCommand } from './create-comment.command';
import { CreateCommentHandler } from './create-comment.handler';
import { ErrorMessage } from "../../domain/error";

describe('CreateCommentHandler', () => {
  let handler: CreateCommentHandler;
  let repositoryPost: PostRepository;
  let repositoryComment: CommentRepository;
  let factory: CommentFactory;

  beforeEach(async () => {
    const repoProviderComment: Provider = {
      provide: CommentRepositoryImplement,
      useValue: {},
    };

    const repoProviderPost: Provider = {
      provide: PostRepositoryImplement,
      useValue: {},
    };

    const factoryProvider: Provider = {
      provide: CommentFactory,
      useValue: {},
    };
    const providers: Provider[] = [
      CreateCommentHandler,
      repoProviderComment,
      repoProviderPost,
      factoryProvider,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreateCommentHandler);
    repositoryComment = testModule.get(CommentRepositoryImplement);
    repositoryPost = testModule.get(PostRepositoryImplement);
    factory = testModule.get(CommentFactory);
  });

  describe('execute', () => {

    it('should be defined', () => {
      expect(handler).toBeDefined();
    });

    it('should be able to create a comment on post', async () => {
      const comment = {};

      repositoryPost.findById = jest.fn().mockResolvedValue({});
      factory.createCommentOnPost = jest.fn().mockReturnValue(comment);
      repositoryComment.save = jest.fn().mockResolvedValue(undefined);

      const command = new CreateCommentCommand('idPost', 'content')

      await expect(handler.execute(command)).resolves.toBe(undefined);
      expect(repositoryComment.save).toBeCalledTimes(1);
      expect(repositoryComment.save).toBeCalledWith(comment);
    });

    it('should be able to create a comment on comment', async () => {
      const comment = {};

      repositoryPost.findById = jest.fn().mockResolvedValue(undefined);
      repositoryComment.findByPostId = jest.fn().mockResolvedValue({});
      factory.createCommentOnComment = jest.fn().mockReturnValue(comment);
      repositoryComment.save = jest.fn().mockResolvedValue(undefined);

      const command = new CreateCommentCommand('idComment', 'content')

      await expect(handler.execute(command)).resolves.toBe(undefined);
      expect(repositoryComment.save).toBeCalledTimes(1);
      expect(repositoryComment.save).toBeCalledWith(comment);
    });

    it('should throw NotFoundException when post or comment is not found', async () => {

      repositoryPost.findById = jest.fn().mockResolvedValue(undefined);
      repositoryComment.findByPostId = jest.fn().mockResolvedValue(undefined);

      const command = new CreateCommentCommand('anyId', 'content')

      await expect(handler.execute(command)).rejects.toThrowError(ErrorMessage.POST_OR_COMMENT_NOT_FOUND);
    });
  });

});
