import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { isEmail } from 'validator';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required : true})
    firstName :  string;
    
    @Prop({required : true})
    lastName : string;
        
    @Prop({required : true})
    middleName : string;
        
    @Prop({required : true, unique : true, lowercase : true, validate : isEmail})
    email : string;
        
    @Prop({required : true, minlength : 8, select : false})
    password : string;
        
    @Prop({required : true, minlength : 8, select : false})
    confirmPassword : string;
        
    @Prop()
    phoneNumber : string;

    @Prop()
    linkedInURL : string;

    @Prop()
    githubURL : string;
    
    @Prop()
    cv : string;
    
    @Prop({enum : ["frontend developer", "backend developer", "UI/UX designer", "product designer", "full stack developer"]})
    skill : string;
        
    @Prop({enum : ["No experience", "1 year", "2 years", "3 years", "4 and above years"]})
    workExperience : string;
        
    @Prop()
    address : string;
   
    @Prop()
    profileImage : string;

    @Prop({default : Date.now()})
    createdAt : Date;
}

export const UserSchema = SchemaFactory.createForClass(User);