import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostCommand } from '../application/commands/create-post.command';
import { DeletePostCommand } from '../application/commands/delete-post.command';
import { UpdatePostCommand } from '../application/commands/update-post.command';
import { FindPostByIdQuery } from '../application/queries/find-post-by-id.query';
import { FindPostsQuery } from '../application/queries/find-posts.query';
import { CreatePostBodyDTO } from './dto/create-post.body.dto';
import { DeletePostParamDTO } from './dto/delete-post.param';
import { FindPostsQueryDTO } from './dto/find-posts.query.dto';
import { FindPostsResponseDTO } from './dto/find-posts.response.dto';
import { FindPostByIdParamDTO } from './dto/find-post-by-id.param.dto';
import { FindPostByIdResponseDTO } from './dto/find-post-by-id.response.dto';
import { UpdatePostBodyDTO } from './dto/update-post.body.dto';
import { UpdatePostParamDTO } from './dto/update-post.param.dto';
import { ResponseDescription } from './response-description';
import { Public } from '../../../shared/application/decorators/public.decorator';
import { PermissionsGuard } from '../../../shared/application/guards/permisisions.guard';
import { Permissions } from '../../../shared/application/decorators/permissions.decorator';

@ApiTags('Post')
@Controller()
export class PostsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post('post')
    @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
    @ApiBearerAuth('access-token')
    @UseGuards(PermissionsGuard)
    @Permissions('post:create')
    async createPost(@Body() body: CreatePostBodyDTO): Promise<void> {
        const command = new CreatePostCommand(body.name, body.description);
        await this.commandBus.execute(command);
    }

    @Delete('post/:id')
    @ApiResponse({ status: 200, description: ResponseDescription.OK })
    @ApiBearerAuth('access-token')
    @UseGuards(PermissionsGuard)
    @Permissions('post:delete')
    async deletePost(@Param() param: DeletePostParamDTO): Promise<void> {
        const command = new DeletePostCommand(param.id);
        await this.commandBus.execute(command);
    }

    @Get('post/:id')
    @ApiResponse({ status: 200, description: ResponseDescription.OK, type: FindPostByIdResponseDTO})
    @ApiBearerAuth('access-token')
    @UseGuards(PermissionsGuard)
    @Permissions('postById:select')
    async findPostById(
        @Param() param: FindPostByIdParamDTO
    ): Promise<FindPostByIdResponseDTO> {
        const query = new FindPostByIdQuery(param.id);
        return this.queryBus.execute(query);
    }

    @Get('posts')
    @ApiResponse({ status: 200, description: ResponseDescription.OK, type: FindPostsResponseDTO })
    @Public()
    async findPost(
        @Query() queryDto: FindPostsQueryDTO
    ): Promise<FindPostsResponseDTO> {
        const query = new FindPostsQuery(queryDto.offset, queryDto.limit);
        return { posts: await this.queryBus.execute(query) };
    }

    @Put('post/:id')
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: ResponseDescription.OK })
    @UseGuards(PermissionsGuard)
    @Permissions('post:update')
    async updatePost(
        @Param() param: UpdatePostParamDTO,
        @Body() body: UpdatePostBodyDTO
    ) {
        const command = new UpdatePostCommand(param.id, body.name, body.description);
        await this.commandBus.execute(command);
    }
}
