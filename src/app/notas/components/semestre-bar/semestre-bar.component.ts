import {  Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { SemestreService } from '../../services/semestre.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalsService } from '../../services/modals.service';
import { Semester } from '../../interfaces/notas.interface';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-semestre-bar',
  templateUrl: './semestre-bar.component.html',
  styleUrls: ['./semestre-bar.component.css']
})
export class SemestreBarComponent implements OnInit,DoCheck {

  semesters:Semester[] = [];
  @Output() semester:EventEmitter<Semester> = new EventEmitter();

  constructor(private semestreService:SemestreService,private modalsService:ModalsService,
    private subjectService:SubjectService) { }
  
  ngDoCheck(): void {
    if(this.semestreService.getRefreshSemester()){
      this.semestreService.getAllSemester()
      .subscribe(resp =>{
       this.semesters = resp.semester;
       
      })
      this.semestreService.setRefreshSemester(false);
    }
  }

  ngOnInit(): void {
    this.semestreService.getAllSemester()
    .subscribe(resp =>{
     this.semesters = resp.semester;
    })
  }

  createSemester(){
    this.modalsService.setCreateSemester(true);
  }

  getSubjects(semester:Semester){
    this.semester.emit(semester);
    this.subjectService.setRefreshSubject(true);
  }

}
