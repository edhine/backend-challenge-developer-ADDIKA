import { Post } from "./post";

export interface PostRepository {
    save(data: Post | Post[]): Promise<void>;
    findById(id: string): Promise<Post | null>;
    softRemove(id: string, removeComments?: boolean): Promise<void>;
}