import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as  argon2  from 'argon2';
import { AuthDTO } from 'src/users/dto/auth_dto';
import { CreateUserDTO } from 'src/users/dto/createUser_dto';
import { UsersService } from 'src/users/services/users/users.service';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor (
        private usersService : UsersService,
        private jwtService : JwtService,
        private configService : ConfigService,
    ) {}


    async signup(createUserDto : CreateUserDTO) : Promise<any> {
        //check if user exists
        const userExists = await this.usersService.findByEmail(createUserDto.email);

        if (userExists) {
            throw new  BadRequestException('User already exists');
        }

        //hash password
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
            ...createUserDto,
            password : hash
        });
        const tokens = await this.getTokens(newUser._id.toString(), newUser.email);
        await this.updateRefreshToken(newUser._id.toString(), tokens.refreshToken.toString());
        return tokens;
    }

    async signin(data : AuthDTO) {
        //check if user exists
        const user = await this.usersService.findByEmail(data.email);
        if (!user) throw new BadRequestException('User does not exist');

        const passwordMatches = await argon2.verify(user.password, data.password);
        if(!passwordMatches) throw new BadRequestException('Passwod is incorrect');

        const tokens = await this.getTokens(user._id.toString(), user.email);
        await this.updateRefreshToken(user._id.toString(), tokens.refreshToken.toString());
        return tokens;
    }

    async logout(userId : string) {
        return this.usersService.update(userId, {
            refreshToken: null,
        });
    }

    hashData(data : string) {
        return argon2.hash(data);
    }

    async updateRefreshToken(userId : string, refreshToken : string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
            refreshToken: hashedRefreshToken,
        });
    }

    async getTokens(userId : string, email : string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub : userId,
                    email,
                },
                {
                    secret : this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn : '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub : userId,
                    email,
                },
                {
                    secret : this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn : '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
