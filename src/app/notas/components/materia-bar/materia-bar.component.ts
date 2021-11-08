import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { Semester, SubjectsPerSemester, Subject } from '../../interfaces/notas.interface';
import { ModalsService } from '../../services/modals.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-materia-bar',
  templateUrl: './materia-bar.component.html',
  styleUrls: ['./materia-bar.component.css']
})
export class MateriaBarComponent implements OnInit, DoCheck {

  @Input() semester!: Semester;
  Subjects: SubjectsPerSemester[] = [];
  onInitSemester!:Semester;

  constructor(private modalsService: ModalsService, private subjectService: SubjectService) { }

  ngDoCheck(): void {
    if (this.semester && this.subjectService.getRefreshSubject()) {
      this.Subjects = [];
      localStorage.setItem('semester', JSON.stringify(this.semester));
      this.subjectService.getAllSubjects(this.semester.id || 0)
        .subscribe(resp => this.Subjects = resp.subjectsPerSemester)
    }
    this.subjectService.setRefreshSubject(false);
  }

  ngOnInit(): void {
    if (localStorage.getItem('semester')) {
      this.onInitSemester = JSON.parse(localStorage.getItem('semester') || '');
      this.subjectService.getAllSubjects(this.onInitSemester.id || 0)
        .subscribe(resp => this.Subjects = resp.subjectsPerSemester);
    }
  }

  createSubject() {
    this.modalsService.setCreateSubject(true);
  }


  setSubjectId(id:number){
    this.subjectService.setSubjectPerSemesterId(id);
  }

}
