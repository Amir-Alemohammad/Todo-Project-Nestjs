import { MiddlewareConsumer, Module , NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host:"localhost",
      port: 5432,
      username: "postgres",
      password: "amir13848431",
      database: "postgres",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // for production mode this property is false
    }),
    UsersModule,
    TodosModule,
    AuthModule,
],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer){
      consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
