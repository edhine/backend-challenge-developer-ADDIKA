import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ErrorMessage } from '../../domain/error';
import { PostRepository } from '../../domain/repository';
import { PostRepositoryImplement } from '../../infrastructure/repositories/post.repository';
import { DeletePostCommand } from './delete-post.command';
import { DeletePostHandler } from './delete-post.handler';

describe('DeletePostHandler', () => {
  let handler: DeletePostHandler;
  let repositoryPost: PostRepository;

  beforeEach(async () => {
    const repoProviderPost: Provider = {
      provide: PostRepositoryImplement,
      useValue: {},
    };

    const providers: Provider[] = [
      DeletePostHandler,
      repoProviderPost,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(DeletePostHandler);
    repositoryPost = testModule.get(PostRepositoryImplement);
  });

  describe('execute', () => {

    it('should be defined', () => {
      expect(handler).toBeDefined();
    });

    it('should be able to delete a post', async () => {

      repositoryPost.findById = jest.fn().mockResolvedValue({});
      repositoryPost.softRemove = jest.fn().mockResolvedValue(undefined);

      const command = new DeletePostCommand('idPost')

      await expect(handler.execute(command)).resolves.toBe(undefined);
      expect(repositoryPost.softRemove).toBeCalledTimes(1);
      expect(repositoryPost.softRemove).toBeCalledWith('idPost');
    });

    it('should throw NotFoundException when post is not found', async () => {

      repositoryPost.findById = jest.fn().mockResolvedValue(undefined);

      const command = new DeletePostCommand('idPost')

      await expect(handler.execute(command)).rejects.toThrowError(ErrorMessage.POST_IS_NOT_FOUND);
    });
  });

});
