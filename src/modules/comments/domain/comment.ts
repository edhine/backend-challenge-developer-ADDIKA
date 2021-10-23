import { AggregateRoot } from "@nestjs/cqrs";

export type CommentRequiredProperties = Required<{
    readonly content: string;
}>;

export type CommentOptionalsProperties = Partial<{
    readonly id: string;
    
    // evaluar
    readonly idPost: any | null;
    readonly parentComment: any | null;
    readonly childrenComment: any[] | null;

    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date | null;
    readonly version: number;
}>;

export type CommentProperties = CommentRequiredProperties & Required<CommentOptionalsProperties>;

export interface Comment {
    properties: () => CommentProperties;
}

export class CommentImplement extends AggregateRoot implements Comment {

    private readonly id: string;
    private readonly content: string;
    private parentComment: any | null = null;
    private idPost: any | null = null;
    readonly childrenComment: any[] | null = null;

    private readonly createdAt: Date = new Date();
    private updatedAt: Date = new Date();
    private deletedAt: Date | null = null;
    private version: number = 0;

    constructor(
        properties: CommentRequiredProperties & CommentOptionalsProperties
    ) {
        super();
        Object.assign(this, properties);
    }

    properties(): CommentProperties {
        return {
            id: this.id,
            idPost: this.idPost,
            content: this.content,
            parentComment: this.parentComment,
            childrenComment: this.childrenComment,

            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            version: this.version
        };
    }
}