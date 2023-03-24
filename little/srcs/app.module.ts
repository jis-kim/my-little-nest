import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // make datasources
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jisukim',
      database: 'little',
      //entities: [__dirname + '/**/*.entity{.ts,.js}'], autoLoadEntities 사용시 필요없음
      synchronize: true, // 항상 DB와 Entity를 동기화. production 에서는 사용하지 않음
      autoLoadEntities: true, // entity 가 자동으로 로드됨 (forFeature 로 등록된 모든 entities)
      // relationship 같은 것으로 연결된 Entity 라도 forFeature 하지 않으면 로드되지 않는다.
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
