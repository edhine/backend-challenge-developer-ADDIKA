import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { LoggerModule } from '../../shared/application/logger/logger.module';

@Module({
  imports: [
    LoggerModule
  ],
  controllers: [ExampleController],
  providers: [ExampleService]
})
export class ExampleModule {}
