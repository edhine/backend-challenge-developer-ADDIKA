export class Post {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
  readonly comments: any[] | null;
}

export class ItemInPost {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
  readonly comments: any[] | null;
}

export class Posts extends Array<ItemInPost> {}

export interface PostQuery {
  findById(id: string): Promise<Post>;
  find(offset: number, limit: number): Promise<Posts>;
}
