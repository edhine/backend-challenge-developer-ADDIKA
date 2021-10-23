import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FindPostByIdQuery } from './find-post-by-id.query';
import { ErrorMessage } from '../../domain/error';
import { Post, PostQuery } from './post.query';
import { FindPostByIdHandler } from './find-post-by-id.handler';
import { PostQueryImplement } from '../../infrastructure/queries/post.query';
import { FindPostByIdResult } from './find-post-by-id.result';

describe('FindPostById', () => {
  let postQuery: PostQuery;
  let handler: FindPostByIdHandler;

  beforeEach(async () => {
    const queryProvider: Provider = {
      provide: PostQueryImplement,
      useValue: {},
    };
    const providers: Provider[] = [
      queryProvider,
      FindPostByIdHandler
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();
    postQuery = testModule.get(PostQueryImplement);
    handler = testModule.get(FindPostByIdHandler);
  });

  describe('execute', () => {

    it('should return FindPostByIdResult when execute FindPostByIdQuery', async () => {
      const post: Post =
      {
        id: '1',
        name: 'name',
        comments: [],
        description: 'description',
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        deletedAt: null,
      };
      postQuery.findById = jest.fn().mockResolvedValue(post);

      const query = new FindPostByIdQuery('idPost');

      const result: FindPostByIdResult =
      {
        id: '1',
        name: 'name',
        comments: [],
        description: 'description',
        createdAt: expect.anything(),
      };

      await expect(handler.execute(query)).resolves.toEqual(result);
      expect(postQuery.findById).toBeCalledTimes(1);
      expect(postQuery.findById).toBeCalledWith(query.id);
    });


    it('should throw NotFoundException when data is not found', async () => {
      postQuery.findById = jest.fn().mockResolvedValue(undefined);

      const query = new FindPostByIdQuery('idPost');
      await expect(handler.execute(query)).rejects.toThrowError(ErrorMessage.POST_IS_NOT_FOUND);
    });
  });
});
