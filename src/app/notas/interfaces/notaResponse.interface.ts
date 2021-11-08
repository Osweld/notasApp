import { Cycle, User, Year, Semester, SubjectsPerSemester, SubjectsPerCareer, Activity, ActivityNumber, Assignment } from './notas.interface';

export interface RegistrationResponse{
    user:User;
}

export interface CycleResponse{
    cycle:Cycle[];
}

export interface YearResponse{
    year:Year[];
}

export interface AllSemesterResponse{
    semester:Semester[];
}

export interface SemesterResponse{
    semester:Semester;
}

export interface ActivityResponse{
    activity:Activity[];
}

export interface ActivityNumberResponse{
    activityNumber:ActivityNumber[];
}

export interface UserResponse{
    user:User;
}

export interface SubjectsPerCareerResponse{
    subjectsPerCareer:SubjectsPerCareer[];
}

export interface SubjectPerSemesterResponse{
    subjectsPerSemester:SubjectsPerSemester[];
}

export interface SaveSubjectPerSemesterResponse{
    subjectsPerSemester:SubjectsPerSemester;
}

export interface AllAssignmentResponse{
    assignment:Assignment[];
}

export interface AssignmentResponse{
    assignment:Assignment;
}

export interface CheckSubject{
    existSubject:boolean;
}
