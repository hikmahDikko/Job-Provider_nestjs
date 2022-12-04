import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './contollers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : 'User', schema : UserSchema}], 'users')],
  controllers: [UsersController],
  providers: [
    {
      provide : UsersService,
      useClass : UsersService,
    }
]
})

export class UsersModule {}
