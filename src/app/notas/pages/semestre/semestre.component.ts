import { Component, OnInit } from '@angular/core';
import { Semester } from '../../interfaces/notas.interface';

@Component({
  selector: 'app-semestre',
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.css']
})
export class SemestreComponent implements OnInit {

  activeSemesterModal:boolean = false;

  semester!:Semester;

  constructor() { }

  ngOnInit(): void {
    // if(localStorage.getItem('semester')){
    //   this.semester = JSON.parse(localStorage.getItem('semester') || '');
    // }
  }

  createSemester(createSemester:boolean){
    this.activeSemesterModal = createSemester;
  }

  getSubjectsPerSemester(semester:Semester){
    this.semester = semester;
  }



}
