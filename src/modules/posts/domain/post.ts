import { AggregateRoot } from "@nestjs/cqrs";
import { PostUpdatedEvent } from "./events/update-post.event";

export type PostRequiredProperties = Required<{
}>;

export type PostOptionalsProperties = Partial<{
    readonly id: string;
    
    readonly name: string;
    readonly description: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date | null;
    readonly version: number;
}>;

export type PostProperties = PostRequiredProperties & Required<PostOptionalsProperties>;

export interface Post {
    properties(): PostProperties;
    updatePost(name: string, description: string): void;
}

export class PostImplement extends AggregateRoot implements Post {

    private readonly id: string;
    private readonly createdAt: Date = new Date();
    
    private description: string;
    private name: string;
    private updatedAt: Date = new Date();
    private deletedAt: Date | null = null;
    private version: number = 0;

    constructor(
        properties: PostRequiredProperties & PostOptionalsProperties
    ) {
        super();
        Object.assign(this, properties);
    }

    properties(): PostProperties {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            version: this.version
        };
    }

    updatePost(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.apply(Object.assign(new PostUpdatedEvent(), this))
    }
}