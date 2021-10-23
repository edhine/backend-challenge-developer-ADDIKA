import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ErrorMessage } from '../../domain/error';
import { PostRepository } from '../../domain/repository';
import { PostRepositoryImplement } from '../../infrastructure/repositories/post.repository';
import { UpdatePostCommand } from './update-post.command';
import { UpdatePostHandler } from './update-post.handler';

describe('UpdatePostHandler', () => {
  let handler: UpdatePostHandler;
  let repositoryPost: PostRepository;

  beforeEach(async () => {
    const repoProviderPost: Provider = {
      provide: PostRepositoryImplement,
      useValue: {},
    };

    const providers: Provider[] = [
      UpdatePostHandler,
      repoProviderPost,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(UpdatePostHandler);
    repositoryPost = testModule.get(PostRepositoryImplement);
  });

  describe('execute', () => {

    it('should be defined', () => {
      expect(handler).toBeDefined();
    });

    it('should be able to update a post', async () => {
      const post = { updatePost: jest.fn() };

      repositoryPost.findById = jest.fn().mockResolvedValue(post);
      repositoryPost.save = jest.fn().mockResolvedValue(undefined);

      const command = new UpdatePostCommand('idPost', 'name', 'description');

      await expect(handler.execute(command)).resolves.toBe(undefined);
      expect(post.updatePost).toBeCalledTimes(1);
      expect(post.updatePost).toBeCalledWith(
        command.name,
        command.description,
      );
      expect(repositoryPost.save).toBeCalledTimes(1);
      expect(repositoryPost.save).toBeCalledWith(post);
    });

    it('should throw NotFoundException when post is not found', async () => {

      repositoryPost.findById = jest.fn().mockResolvedValue(undefined);

      const command = new UpdatePostCommand('idPost', 'name', 'description');

      await expect(handler.execute(command)).rejects.toThrowError(ErrorMessage.POST_IS_NOT_FOUND);
    });
  });

});
