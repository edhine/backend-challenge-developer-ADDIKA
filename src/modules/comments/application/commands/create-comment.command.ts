import { ICommand } from "@nestjs/cqrs";

export class CreateCommentCommand implements ICommand {
    constructor(
        readonly id: string,
        readonly content: string,
    ) { }
}
