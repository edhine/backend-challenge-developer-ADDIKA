import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { Post, PostImplement, PostProperties } from "./post";

export class PostFactory {
    
    constructor(
        @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
    ) {}

    create(name: string, description?: string): Post {
        return this.eventPublisher.mergeObjectContext(
            new PostImplement({ name, description }),
        );
    }

    reconstitute(properties: PostProperties): Post {
        return this.eventPublisher.mergeObjectContext(
            new PostImplement(properties),
        );
    }
}