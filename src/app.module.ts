import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ExampleModule } from './modules/example/example.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.development' }),
    SharedModule,
    ExampleModule,
  ],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe }
  ],
})
export class AppModule {}
