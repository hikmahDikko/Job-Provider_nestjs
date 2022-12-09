import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { CreateUserParams, UpdateUserParams } from '../../utils/types';

@Injectable()
export class UsersService {
    //To connect to the database
    constructor(
        @InjectModel(User.name) private userModel : Model<UserDocument>,        
    ) {}

    async create(userDetails : CreateUserParams) : Promise<UserDocument> {
        const newUser = new this.userModel(userDetails);
        const result = await newUser.save();
        return result;
    }

    async findAll() : Promise <UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findById(id : string) : Promise <UserDocument> {
        return this.userModel.findById(id);
    }

    async findByEmail(email : string) : Promise<UserDocument> {
        return this.userModel.findOne({ email }).exec();
    }

    async delete(id : string) {
        return this.userModel.findByIdAndDelete({id})
    }

    async update(id : string, updateUserDetails : UpdateUserParams) : Promise <UserDocument>  {
        const user = await this.userModel.findById({ id });

        if(!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        const newUserProfile = this.userModel.findByIdAndUpdate(
            id,
            updateUserDetails,
            {
                new : true,
            }
        ).exec();
        
        return newUserProfile;

    }

}
