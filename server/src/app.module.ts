import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// News Imports 

import { TypeOrmModule} from '@nestjs/typeorm'
import { TypeTasksModule } from './type_tasks/type_tasks.module';
import { TasksModule } from './tasks/tasks.module';

import { ConfigModule} from '@nestjs/config';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false
    }),
    TasksModule,
    TypeTasksModule,
    ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
