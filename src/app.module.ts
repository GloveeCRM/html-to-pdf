import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiKeyService } from './apiKey.service';
import { RequestLogService } from './requestLog.service';
import { ApiKey } from './apiKey.entity';
import { RequestLog } from './requestLog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '/app/data/db.sqlite',
      entities: [ApiKey, RequestLog],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ApiKey, RequestLog]),
  ],
  controllers: [AppController],
  providers: [AppService, ApiKeyService, RequestLogService],
})
export class AppModule {}
