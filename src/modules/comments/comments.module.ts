import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../shared/application/logger/logger.module';
import { PostsModule } from '../posts/posts.module';
import { CreateCommentHandler } from './application/commands/create-comment.handler';
import { DeleteCommentHandler } from './application/commands/delete-comment.handler';
import { FindCommentsByPostIdHandler } from './application/queries/find-comments-by-post-id.handler';
import { CommentFactory } from './domain/factory';
import { CommentEntity } from './infrastructure/entities/comment.entity';
import { IntegrationEventPublisherImplement } from './infrastructure/message/integration-event.publisher';
import { CommentQueryImplement } from './infrastructure/queries/comment.query';
import { CommentRepositoryImplement } from './infrastructure/repositories/comment.repository';
import { CommentsController } from './interface/comments.controller';

const infrastructure = [
  IntegrationEventPublisherImplement,
  CommentQueryImplement,
  CommentRepositoryImplement,
];

const application = [
  CreateCommentHandler,
  DeleteCommentHandler,
  FindCommentsByPostIdHandler
];

const domain = [
  CommentFactory
];

@Module({
  imports: [
    LoggerModule, 
    CqrsModule,
    PostsModule,
    TypeOrmModule.forFeature([CommentEntity])
  ],
  exports: [
    TypeOrmModule,
    ...infrastructure,
  ],
  controllers: [CommentsController],
  providers: [...infrastructure, ...application, ...domain]
})
export class CommentsModule {}
