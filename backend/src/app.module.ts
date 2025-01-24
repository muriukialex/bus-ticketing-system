import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './auth/config/jwt.config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { RoutesModule } from './routes/routes.module';
import { UserModule } from './user/user.module';
import { PaginationModule } from './common/pagination/pagination.module';

const ENV = process.env.NODE_ENV;
const ENV_FILE_PATH = ENV ? '.env' : `.env.${ENV}`;

@Module({
  imports: [
    AuthModule,
    RoutesModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: configService.get('database.AUTO_LOAD_ENTITIES'), // alternative is to manually load all entities like so, entities: [User, Post],
        synchronize: configService.get('database.SYNCHRONIZE'),
        port: +configService.get('database.DATABASE_PORT'),
        username: configService.get('database.DATABASE_USERNAME'),
        password: configService.get('database.DATABASE_PASSWORD'),
        host: configService.get('database.DATABASE_HOST'),
        database: configService.get('database.DATABASE_NAME'),
      }),
    }),
    // jwt configuration
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
