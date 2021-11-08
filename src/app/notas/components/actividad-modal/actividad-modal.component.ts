import { Component, Input, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  ActivatedRoute } from '@angular/router';
import { Activity, ActivityNumber, Assignment } from '../../interfaces/notas.interface';
import { ActivityModal } from '../../interfaces/utils.interface';
import { AssignmentService } from '../../services/assignment.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actividad-modal',
  templateUrl: './actividad-modal.component.html',
  styleUrls: ['./actividad-modal.component.css']
})
export class ActividadModalComponent implements OnInit,DoCheck{

  activeModal:boolean = false;
  editAssignment:Assignment | undefined;
  assignment!:Assignment;
  message:string = "Hubo un error!!!";
  error:boolean = false;

  @Input() activities:Activity[] = [];
  @Input() activityNumbers:ActivityNumber[] = [];
  @Input() activityModal:ActivityModal | undefined;
  
  @Output() refreshAssignment:EventEmitter<boolean> = new EventEmitter();

  myForm: FormGroup = this.fb.group({
    id:[],
    activity: this.fb.group({
      id:['',[Validators.required]]
    }),
    activityNumber:this.fb.group({
      id:['',[Validators.required]]
    }),
    subjectsPerSemester:this.fb.group({
      id:['']
    }),
    percent: [1, [Validators.required,Validators.min(1),Validators.max(100)]],
    score: [0, [Validators.required,Validators.min(0),Validators.max(10)]],
    finish: [false],
  });

  


  constructor(private fb:FormBuilder,private router:ActivatedRoute,private assignmentService:AssignmentService) {
   }


   isInvalid(field:string){
     return this.myForm.get(field)?.errors && this.myForm.get(field)?.touched;
   }

   isInvalidPercentText():string{
     const errors = this.myForm.get('percent')?.errors
     if(errors?.required){
       return 'No puede quedar vacio'
     }else{
      return 'El porcentaje debe estar entre 1 y 100'
     }
   }

   isInvalidScoreText():string{
    const errors = this.myForm.get('score')?.errors
    if(errors?.required){
      return 'No puede quedar vacio'
    }else{
     return 'La nota debe estar entre 0 y 10'
    }
  }

  ngDoCheck(): void {
    if(this.activityModal && !this.activeModal){
      this.activeModal = this.activityModal.active;
      this.editAssignment = this.activityModal.assignment;
      if(this.editAssignment){
        this.myForm.reset({...this.editAssignment});
        console.log(this.editAssignment)
        console.log(this.myForm.value)
      }
    }
  }

  ngOnInit(): void {
  }





  saveAssignment(){
    //is invalid
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.error = false;
    //update or new???
    if(this.myForm.get('id')?.value){
      this.assignment = this.myForm.value
      this.assignmentService.updateAssignment(this.assignment).subscribe(resp =>{
        console.log(resp)
        this.refreshAssignment.emit(true)
        this.close()
      },(error:HttpErrorResponse) =>{
        console.log(error)
        this.error = true
      })
    }else{
      this.router.params.subscribe(({id}) =>this.myForm.get('subjectsPerSemester.id')?.setValue(id))
      this.assignment = this.myForm.value
    this.assignmentService.saveAssignment(this.assignment.subjectsPerSemester.id!,this.assignment.activity.id!,
      this.assignment.activityNumber.id!,this.assignment).subscribe(resp =>{
        console.log(resp)
        this.refreshAssignment.emit(true)
        this.close()
      },(error:HttpErrorResponse) =>{
        console.log(error)
        this.error = true
      })
    }
  }

  close(){
    this.activeModal = false;
    this.activityModal = undefined;
    this.error = false;
    this.myForm.reset({
      activity:{
        id:""
      },
      activityNumber:{
        id:""
      },
      subjectPerSemester:{
        id:""
      },
      finish:false,
      score:0
    })
  }

}
