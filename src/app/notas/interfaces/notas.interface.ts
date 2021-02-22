export interface CareersResponse {
    career: Career[];
}

export interface Career {
    id?:       number;
    career:   string;
    createAt?: Date;
}

export interface User {
    id?:number;
    username:string;
    password?:string;
    createAt?:Date;
    person?:Person;
    active?:boolean;
    rol?:Rol
}

export interface Rol{
    id?:number;
    rol:string;
    createAt?:Date;
}

export interface Person {
    id?:number;
    name:string;
    lastname:string;
    birthdate:Date;
    createAt?:Date;
    email:string;
    gender:string;
    career?:Career;
}
