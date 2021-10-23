import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FindPostByIdQuery } from '../../../posts/application/queries/find-post-by-id.query';
import { ErrorMessage } from '../../domain/error';
import { CommentQueryImplement } from '../../infrastructure/queries/comment.query';
import { CommentQuery, Comments } from './comment.query';
import { FindCommentsByPostIdHandler } from './find-comments-by-post-id.handler';
import { FindCommentsByPostIdQuery } from './find-comments-by-post-id.query';
import { FindCommentsResult } from './find-comments-by-post-id.result';

describe('FindCommentsByPostId', () => {
  let commentQuery: CommentQuery;
  let handler: FindCommentsByPostIdHandler;

  beforeEach(async () => {
    const queryProvider: Provider = {
      provide: CommentQueryImplement,
      useValue: {},
    };
    const providers: Provider[] = [
      queryProvider,
      FindCommentsByPostIdHandler
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();
    commentQuery = testModule.get(CommentQueryImplement);
    handler = testModule.get(FindCommentsByPostIdHandler);
  });

  describe('execute', () => {

    it('should return FindCommentsResult when execute FindAccountByIdQuery', async () => {
      const comments: Comments = [
        {
          id: '1',
          content: 'content',
          childrenComment: [],
          parentComment: null,
          version: 1,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          deletedAt: null,
        }
      ];
      commentQuery.findByPostId = jest.fn().mockResolvedValue(comments);

      const query = new FindPostByIdQuery('accountId');

      const result: FindCommentsResult = [
        {
          id: '1',
          content: 'content',
          childrenComment: [],
          version: 1,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          deletedAt: null,
        }
      ];

      await expect(handler.execute(query)).resolves.toEqual(result);
      expect(commentQuery.findByPostId).toBeCalledTimes(1);
      expect(commentQuery.findByPostId).toBeCalledWith(query.id);
    });


    it('should throw NotFoundException when data is not found', async () => {
      commentQuery.findByPostId = jest.fn().mockResolvedValue(undefined);

      const query = new FindCommentsByPostIdQuery('idPost');
      await expect(handler.execute(query)).rejects.toThrowError(ErrorMessage.POST_IS_NOT_FOUND);
    });
  });
});
