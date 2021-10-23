import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../shared/application/logger/logger.module';
import { CreatePostHandler } from './application/commands/create-post.handler';
import { DeletePostHandler } from './application/commands/delete-post.handler';
import { UpdatePostHandler } from './application/commands/update-post.handler';
import { FindPostByIdHandler } from './application/queries/find-post-by-id.handler';
import { FindPostsHandler } from './application/queries/find-posts.handler';
import { PostFactory } from './domain/factory';
import { PostEntity } from './infrastructure/entities/post.entity';
import { IntegrationEventPublisherImplement } from './infrastructure/message/integration-event.publisher';
import { PostQueryImplement } from './infrastructure/queries/post.query';
import { PostRepositoryImplement } from './infrastructure/repositories/post.repository';
import { PostsController } from './interface/posts.controller';

const infrastructure = [
  IntegrationEventPublisherImplement,
  PostRepositoryImplement,
  PostQueryImplement,
];

const application = [
  CreatePostHandler,
  DeletePostHandler,
  UpdatePostHandler,

  FindPostsHandler,
  FindPostByIdHandler,
];

const domain = [
  PostFactory
];

const externalThisModule = [
  PostRepositoryImplement
];

@Module({
  imports: [
    LoggerModule, 
    CqrsModule,
    TypeOrmModule.forFeature([PostEntity])
  ],
  exports: [
    TypeOrmModule,
    ...infrastructure
  ],
  controllers: [PostsController],
  providers: [...infrastructure, ...application, ...domain, ...externalThisModule]
})
export class PostsModule {}
