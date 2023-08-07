export interface IAuthLogin {
    username: string;
    password: string;
}

export interface IAuthRegister {
    name: string;
    username: string;
    password: string;
    city: string;
};

export interface IUser {
    _id?: string | number;
    name?: string;
    username: string;
    password: string;
    city?: string;
}