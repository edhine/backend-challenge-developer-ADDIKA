import { IQueryResult } from '@nestjs/cqrs';

export class FindCommentsByIdResult implements IQueryResult {
  readonly id: string = '';
  readonly content: string = '';
  readonly childrenComment: any[] = [];
  readonly createdAt: Date = null;
  readonly updatedAt: Date = null;
  readonly deletedAt: Date = null;
  readonly version: number = null;
}

export class FindCommentsResult
  extends Array<FindCommentsByIdResult>
  implements IQueryResult { }
