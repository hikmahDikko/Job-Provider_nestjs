import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { CreateUserParams, UpdateUserParams } from '../../utils/types';

@Injectable()
export class UsersService {
    //To connect to the database
    constructor(
        @InjectModel('User') private userModel : Model<UserDocument>,
        //@InjectConnection('User') private connection : Connection        
    ) {}

    async findUser(){
        const result = await this.userModel.find();
        return result;
    }

    async createUser(userDetails : CreateUserParams) : Promise<User> {
        const newUser = new this.userModel({ 
            ...userDetails,
        });
        const result = await newUser.save();
        return result;
    }

    async deleteUser(id : mongoose.Schema.Types.ObjectId) {
        return this.userModel.findByIdAndDelete({id})
    }

    async updateUser(id : mongoose.Schema.Types.ObjectId, updateUserDetails : UpdateUserParams) {
        const user = await this.userModel.findById({ id });

        if(!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        const newUserProfile = this.userModel.findByIdAndUpdate(
            updateUserDetails,
        );
        
        return newUserProfile;

    }

}
