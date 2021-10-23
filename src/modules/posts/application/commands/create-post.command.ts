import { ICommand } from "@nestjs/cqrs";

export class CreatePostCommand implements ICommand {
    constructor(
        readonly name: string,
        readonly description: string
    ) { }
}
