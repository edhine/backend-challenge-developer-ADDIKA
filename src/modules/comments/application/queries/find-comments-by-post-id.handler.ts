import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../domain/error';
import { CommentQueryImplement } from '../../infrastructure/queries/comment.query';
import { CommentQuery, ItemInComment } from './comment.query';
import { FindCommentsByPostIdQuery } from './find-comments-by-post-id.query';
import { FindCommentsResult, FindCommentsByIdResult } from './find-comments-by-post-id.result';

@QueryHandler(FindCommentsByPostIdQuery)
export class FindCommentsByPostIdHandler
  implements IQueryHandler<FindCommentsByPostIdQuery, FindCommentsResult>
{
  constructor(
    @Inject(CommentQueryImplement) readonly commentQuery: CommentQuery,
  ) {}
  async execute(query: FindCommentsByPostIdQuery): Promise<FindCommentsResult> {
    const data = await this.commentQuery.findByPostId(query.id);
    if (!data) throw new NotFoundException(ErrorMessage.POST_IS_NOT_FOUND);
  
    return data.map((item) => this.filterResultProperties(item));
  }

  private filterResultProperties(
    data: ItemInComment,
  ): FindCommentsByIdResult {
    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new FindCommentsByIdResult());

    if (dataKeys.length < resultKeys.length)
      throw new InternalServerErrorException();

    if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey)))
      throw new InternalServerErrorException();

    dataKeys
      .filter((dataKey) => !resultKeys.includes(dataKey))
      .forEach((dataKey) => delete data[dataKey]);

    return data;
  }

}
