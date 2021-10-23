import { IQueryResult } from '@nestjs/cqrs';

export class FindPostByIdResult implements IQueryResult {
  readonly id: string = '';
  readonly name: string = '';
  readonly description: string = '';
  readonly createdAt: Date = new Date();
  readonly comments: any[] = [];
}
