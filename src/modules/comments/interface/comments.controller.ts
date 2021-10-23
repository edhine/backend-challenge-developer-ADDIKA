import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permissions } from '../../../shared/application/decorators/permissions.decorator';
import { Public } from '../../../shared/application/decorators/public.decorator';
import { PermissionsGuard } from '../../../shared/application/guards/permisisions.guard';
import { CreateCommentCommand } from '../application/commands/create-comment.command';
import { DeleteCommentCommand } from '../application/commands/delete-comment.command';
import { FindCommentsByPostIdQuery } from '../application/queries/find-comments-by-post-id.query';
import { CreateCommentBodyDTO } from './dto/create-comment.body.dto';
import { DeleteCommentParamDTO } from './dto/delete-comment.param.dto';
import { FindCommentsByPostIdParamDTO } from './dto/find-comments-by-post-id.param.dto';
import { ResponseDescription } from './response-description';

@ApiTags('Comment')
@Controller()
export class CommentsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post('comment')
    @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
    @Public()
    async createPost(@Body() body: CreateCommentBodyDTO): Promise<any> {
        const command = new CreateCommentCommand(body.id, body.content);
        return await this.commandBus.execute(command);
    }

    @Delete('comment/:id')
    @ApiResponse({ status: 200, description: ResponseDescription.OK })
    @ApiBearerAuth('access-token')
    @UseGuards(PermissionsGuard)
    @Permissions('comment:delete')
    async deleteComment(@Param() param: DeleteCommentParamDTO) {
        const command = new DeleteCommentCommand(param.id);
        await this.commandBus.execute(command);
    }

    @Get('comments/post/:id')
    @ApiResponse({ status: 200, description: ResponseDescription.OK })
    @ApiBearerAuth('access-token')
    @UseGuards(PermissionsGuard)
    @Permissions('commentsByPostId:select')
    async findCommentsByPostId(@Param() param: FindCommentsByPostIdParamDTO) {
        const query = new FindCommentsByPostIdQuery(param.id);
        return { comments: await this.queryBus.execute(query) };
    }
}