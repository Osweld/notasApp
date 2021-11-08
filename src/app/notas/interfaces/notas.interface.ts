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

export interface Cycle {
    id?:number;
    cycle:string;
    createAt?:Date
}

export interface Year {
    id?:number;
    year:number;
    createAt?:Date
}

export interface Semester{
    id?:number;
    user?:User;
    cycle:Cycle;
    year:Year;
}

export interface Subject{
    id?:number;
    subject?:string;
    createAt?:Date;
}

export interface SubjectsPerCareer{
    id?:number;
    createAt?:Date;
    career?:Career;
    cycle?:Cycle;
    subject?:Subject;
}

export interface SubjectsPerSemester{
    id?:number;
    createAt?:Date;
    semester?:Semester;
    subjectsPerCareer?:SubjectsPerCareer;
}

export interface Activity{
    id?:number;
    activity?:string;
    createAt?:Date;
}

export interface ActivityNumber{
    id?:number;
    number?:number;
    createAt?:Date;
}

export interface Assignment{
    id?:number;
    percent?:number;
    score?:number;
    finish?:boolean;
    createAt?:Date;
    activity:Activity;
    activityNumber:ActivityNumber;
    subjectsPerSemester:SubjectsPerSemester;
}
