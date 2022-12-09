import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from '../../dto/createUser_dto';
import { UsersService } from '../../services/users/users.service';
import { UpdateUserDTO } from '../../dto/updateUser.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {

    constructor(private usersServices : UsersService) {}

    @Get()
    async findAll(){
        const users = await this.usersServices.findAll();
        return users;
    }

    @Post()
    create(@Body() createUserDto : CreateUserDTO){
        return this.usersServices.create(createUserDto);
    }

    @Get('login')
    async findById(@Param("id") id : string){
        const users = await this.usersServices.findById(id);
        return users;
    }

    @Patch(':id')
    async update(
        @Param("id")  id: string, 
        @Body() updateUserDTO : UpdateUserDTO) {
            await this.usersServices.update(id, updateUserDTO)
    }

    @Delete(':id')
    async delete(
        @Param("id") id : string) {
            await this.usersServices.delete(id)

    }

}
