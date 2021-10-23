import { Inject, Injectable } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { Comment, CommentImplement, CommentProperties } from "./comment";

@Injectable()
export class CommentFactory {
    
    constructor(
        @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
    ) {}

    createCommentOnPost(idPost: string, content: string): Comment {
        return this.eventPublisher.mergeObjectContext(
            new CommentImplement({ idPost, content }),
        );
    }

    createCommentOnComment(parentComment: object, content: string): Comment {
        return this.eventPublisher.mergeObjectContext(
            new CommentImplement({ parentComment, content }),
        );
    }

    reconstitute(properties: CommentProperties): Comment {
        return this.eventPublisher.mergeObjectContext(
            new CommentImplement(properties),
        );
    }
}