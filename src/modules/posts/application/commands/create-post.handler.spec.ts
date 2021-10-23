import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PostRepository } from '../../domain/repository';
import { PostRepositoryImplement } from '../../infrastructure/repositories/post.repository';
import { CreatePostHandler } from './create-post.handler';
import { PostFactory } from '../../domain/factory';
import { CreatePostCommand } from './create-post.command';

describe('CreatePostHandler', () => {
  let handler: CreatePostHandler;
  let repositoryPost: PostRepository;
  let factory: PostFactory;

  beforeEach(async () => {

    const repoProviderPost: Provider = {
      provide: PostRepositoryImplement,
      useValue: {},
    };

    const factoryProvider: Provider = {
      provide: PostFactory,
      useValue: {},
    };

    const providers: Provider[] = [
      CreatePostHandler,
      repoProviderPost,
      factoryProvider
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreatePostHandler);
    repositoryPost = testModule.get(PostRepositoryImplement);
    factory = testModule.get(PostFactory);
  });

  describe('execute', () => {

    it('should be defined', () => {
      expect(handler).toBeDefined();
    });

    it('should be able to create a post', async () => {
      const post = {};

      factory.create = jest.fn().mockReturnValue(post);
      repositoryPost.save = jest.fn().mockResolvedValue(undefined);

      const command = new CreatePostCommand('name', 'description')

      await expect(handler.execute(command)).resolves.toBe(undefined);
      expect(repositoryPost.save).toBeCalledTimes(1);
      expect(repositoryPost.save).toBeCalledWith(post);
    });
  });

});
