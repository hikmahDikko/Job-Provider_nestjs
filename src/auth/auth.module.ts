import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AccessTokenStrategy } from './strategies/accessToken.strategies';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategies';
import { AuthController } from './contollers/auth/auth.controller';

@Module({
  imports : [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
