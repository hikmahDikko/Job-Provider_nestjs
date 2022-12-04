import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb+srv://Admin:admin@jobrec.vmqb3qw.mongodb.net/JobRecommendation?retryWrites=true&w=majority', {connectionName : 'users'})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
