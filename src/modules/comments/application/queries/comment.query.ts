export class Comment {
    readonly id: string;
    readonly content: string;
    
    readonly parentComment: any | null;
    readonly childrenComment: any[] | null;
    readonly version: number;
    
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date | null;
}

export class ItemInComment {
    readonly id: string;
    readonly content: string;
    
    readonly parentComment: any | null;
    readonly childrenComment: any[] | null;
    readonly version: number;

    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date | null;
}

export class Comments extends Array<ItemInComment> {}

export interface CommentQuery {
    findByPostId: (id: string) => Promise<Comments>;
    find: () => Promise<Comments>;
}