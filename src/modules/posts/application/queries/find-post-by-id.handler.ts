import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../domain/error';
import { PostQueryImplement } from '../../infrastructure/queries/post.query';
import { FindPostByIdQuery } from './find-post-by-id.query';
import { FindPostByIdResult } from './find-post-by-id.result';
import { PostQuery } from './post.query';

@QueryHandler(FindPostByIdQuery)
export class FindPostByIdHandler
  implements IQueryHandler<FindPostByIdQuery, FindPostByIdResult>
{
  constructor(
    @Inject(PostQueryImplement) readonly postQuery: PostQuery,
  ) {}

  async execute(query: FindPostByIdQuery): Promise<FindPostByIdResult> {
    const data = await this.postQuery.findById(query.id);
    if (!data) throw new NotFoundException(ErrorMessage.POST_IS_NOT_FOUND);

    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new FindPostByIdResult());

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
