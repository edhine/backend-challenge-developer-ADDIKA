import { IQuery } from '@nestjs/cqrs';

export class FindPostByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
