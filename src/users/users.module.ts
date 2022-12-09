import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './contollers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  
  imports : [MongooseModule.forFeature([{name : User.name, schema : UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports : [UsersService]
})

export class UsersModule {}
