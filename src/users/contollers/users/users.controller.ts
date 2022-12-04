import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from '../../dto/createUser_dto';
import { UsersService } from '../../services/users/users.service';
import { UpdateUserDTO } from '../../dto/updateUser.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {

    constructor(private usersServices : UsersService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getUsers(){
        const users = await this.usersServices.findUser();
        return users;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    createUser(@Body() createUserDto : CreateUserDTO){
        return this.usersServices.createUser(createUserDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Patch(':id')
    async updateUserById(
        @Param("id")  id: mongoose.Schema.Types.ObjectId, 
        @Body() updateUserDTO : UpdateUserDTO) {
            await this.usersServices.updateUser(id, updateUserDTO)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Delete(':id')
    async deleteUser(
        @Param("id") id : mongoose.Schema.Types.ObjectId) {
            await this.usersServices.deleteUser(id)

    }

}
