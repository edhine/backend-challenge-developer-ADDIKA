import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GuardsModule } from './guards/guards.module';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [
        AuthModule,
        GuardsModule,
        LoggerModule
    ]
})
export class ApplicationModule {}
