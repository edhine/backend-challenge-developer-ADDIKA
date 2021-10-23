import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PostQuery, Posts } from './post.query';
import { PostQueryImplement } from '../../infrastructure/queries/post.query';
import { FindPostsHandler } from './find-posts.handler';
import { FindPostsResult } from './find-posts.result';
import { FindPostsQuery } from './find-posts.query';

describe('FindPosts', () => {
  let postQuery: PostQuery;
  let handler: FindPostsHandler;

  beforeEach(async () => {
    const queryProvider: Provider = {
      provide: PostQueryImplement,
      useValue: {},
    };
    const providers: Provider[] = [
      queryProvider,
      FindPostsHandler,
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();
    postQuery = testModule.get(PostQueryImplement);
    handler = testModule.get(FindPostsHandler);
  });

  describe('execute', () => {

    it('should return FindPostByIdResult when execute FindPostsQuery', async () => {
      const post: Posts = [
        {
          id: '1',
          name: 'name',
          comments: [],
          description: 'description',
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          deletedAt: null,
        }
      ];
      postQuery.find = jest.fn().mockResolvedValue(post);

      const query = new FindPostsQuery(0, 1);

      const results: FindPostsResult = [
        {
          id: '1',
          name: 'name',
          description: 'description',
          createdAt: expect.anything(),
        }
      ];

      await expect(handler.execute(query)).resolves.toEqual(results);
      expect(postQuery.find).toBeCalledTimes(1);
      expect(postQuery.find).toBeCalledWith(query.offset, query.limit);
    });
  });
});
