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
    refreshToken : string;
}

export type authParams = {
    email : string;
    password : string;
}

export type CreateUserParams = {
    firstName : string;
    lastName : string;
    middleName : string;
    password : string;
    confirmPassword : string;
    email : string;
    refreshToken : string;
}

export type UpdateUserParams = {
    refreshToken : string;
}
