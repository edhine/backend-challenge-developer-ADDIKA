import { IQueryResult } from '@nestjs/cqrs';

export class ItemInFindPostsResult {
  readonly id: string = '';
  readonly name: string = '';
  readonly description: string = '';
  readonly createdAt: Date = new Date();
}

export class FindPostsResult
  extends Array<ItemInFindPostsResult>
  implements IQueryResult { }
