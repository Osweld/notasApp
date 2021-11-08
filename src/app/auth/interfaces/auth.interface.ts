export interface Auth{
    username:string;
    password:string;
    expiration:Date;
}

export interface LoginResponse {
    user:  User;
    token: string;
}

export interface Email{
    email:string;
}

export interface Password{
    password:string;
    password2:string;
}

export interface User {
    password:              null;
    username:              string;
    authorities:           Authority[];
    accountNonExpired:     boolean;
    accountNonLocked:      boolean;
    credentialsNonExpired: boolean;
    enabled:               boolean;
    id:                    number;
}

export interface Authority {
    authority: string;
}

export interface TokenRefresh{
    token:string;
    expiration:Date;
}

export interface UserRegistration{
    username:string;
    password:string;
    email:string;
    name: string;
    lastname: string;
    birthdate: Date;
    gender:string;
    career: string;

}
