import { Assignment } from './notas.interface';
export interface CreateSemester{
    cycle:string;
    year:string;
}

export interface CreateSubject{
    subject:number;
}

export interface ActivityModal{
    active:boolean;
    assignment?:Assignment;
}