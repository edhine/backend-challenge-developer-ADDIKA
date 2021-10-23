import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostQueryImplement } from '../../infrastructure/queries/post.query';
import { FindPostsQuery } from './find-posts.query';
import { FindPostsResult, ItemInFindPostsResult } from './find-posts.result';
import { ItemInPost, PostQuery } from './post.query';

@QueryHandler(FindPostsQuery)
export class FindPostsHandler
  implements IQueryHandler<FindPostsQuery, FindPostsResult>
{
  constructor(
    @Inject(PostQueryImplement) readonly accountQuery: PostQuery,
  ) {}

  async execute(query: FindPostsQuery): Promise<FindPostsResult> {
    return (await this.accountQuery.find(query.offset, query.limit)).map(
      this.filterResultProperties,
    );
  }

  private filterResultProperties(
    data: ItemInPost,
  ): ItemInFindPostsResult {
    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new ItemInFindPostsResult());

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
