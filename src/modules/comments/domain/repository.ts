import { Comment } from "./comment";

export interface CommentRepository {
    save(data: Comment | Comment[]): Promise<void>;
    softRemove(id: string, removeChildren?: boolean): Promise<void>;
    findByPostId(id: string): Promise<Comment | null>;
}