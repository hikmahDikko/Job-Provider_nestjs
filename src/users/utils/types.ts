import { Exclude } from 'class-transformer'

export interface User {
    firstName : string;
    lastName : string;
    middleName : string;
    password : string;
    confirmPassword : string;
    email : string;
    phoneNumber : string;
    linkedInURL : string;
    githubURL : string;
    cv : string;
    skill : string;
    workExperience : string;
    address : string;
    profileImage : string;
}

export class SerializedUser {
    firstName : string;
    lastName : string;
    middleName : string;
    email : string;
    phoneNumber : string;
    linkedInURL : string;
    githubURL : string;
    cv : string;
    skill : string;
    workExperience : string;
    address : string;
    profileImage : string;

    @Exclude()
    password : string;

    @Exclude()
    confirmPassword : string;

    constructor(partial : Partial<SerializedUser>) {
        Object.assign(this, partial);
    }
}

export type CreateUserParams = {
    firstName : string;
    lastName : string;
    middleName : string;
    password : string;
    confirmPassword : string;
    email : string;
}

export type UpdateUserParams = {
    firstName : string;
    lastName : string;
    middleName : string;
    email : string;
    phoneNumber : string;
    linkedInURL : string;
    githubURL : string;
    cv : string;
    skill : string;
    workExperience : string;
    address : string;
    profileImage : string;
}
