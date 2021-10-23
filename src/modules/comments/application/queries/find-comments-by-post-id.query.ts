import { IQuery } from '@nestjs/cqrs';

export class FindCommentsByPostIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
