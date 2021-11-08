import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalsService } from '../../services/modals.service';
import { NotasService } from '../../services/notas.service';
import { Semester, SubjectsPerCareer, User } from '../../interfaces/notas.interface';
import { CreateSubject } from '../../interfaces/utils.interface';
import { SubjectService } from '../../services/subject.service';
import { switchMap } from 'rxjs/operators';
import { SaveSubjectPerSemesterResponse } from '../../interfaces/notaResponse.interface';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.css']
})
export class AgregarMateriaComponent implements OnInit , DoCheck {

  @Input() semester!:Semester;
  user!:User;

  activeCreateSubject:boolean = false;
  message:string = 'No se pudo crear la materia';
  showMesage:boolean = false;
  loading:boolean = false;
  cycleId:number = 0;

  
  subjectsPerCareer:SubjectsPerCareer[] = [];
  createSubject!:CreateSubject;

  myForm: FormGroup = this.fb.group({
    subject: ['', [Validators.required]]
  });

  constructor(private subjectService: SubjectService, private notasService: NotasService,
     private fb: FormBuilder,private modalsService:ModalsService) { }

  ngDoCheck(): void {
    this.activeCreateSubject = this.modalsService.getCreateSubject();
    if(this.semester && this.cycleId !== this.semester.cycle.id){
      this.cycleId =  this.semester.cycle.id!
      this.notasService.getUser().pipe(
        switchMap(({user}) => this.notasService.getSubjectsPerCareer(user.person?.career?.id!,this.semester.cycle.id!))
      ).subscribe(resp => this.subjectsPerCareer = resp.subjectsPerCareer,error => console.log(error))
    }
  }

  ngOnInit(): void {
    this.notasService.getUser().pipe(
      switchMap(({user}) => this.notasService.getSubjectsPerCareer(user.person?.career?.id!,this.semester.cycle.id!))
    ).subscribe(resp => this.subjectsPerCareer = resp.subjectsPerCareer,error => console.log(error))
  }

  ValidatorsForm(control:string){
    return this.myForm.get(control)?.errors && this.myForm.get(control)?.touched
  }



  selectSubject() {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
    }
    this.loading = true;
    this.showMesage = false;


    this.createSubject = this.myForm.value;
    this.subjectService.saveSubject(this.createSubject.subject,this.semester.id!)
    .subscribe( resp =>{
      this.loading = false;
      this.subjectService.setRefreshSubject(true);
      this.modalsService.setCreateSubject(false);
      this.myForm.reset({
        subject:""
      });
    },error =>{
      this.loading = false;
      console.log(error);
    this.showMesage = true;
    })
  }

  close(){
   this.modalsService.setCreateSubject(false);
  }

}

