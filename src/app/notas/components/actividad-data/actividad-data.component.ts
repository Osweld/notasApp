import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { Assignment } from '../../interfaces/notas.interface';

@Component({
  selector: 'app-actividad-data',
  templateUrl: './actividad-data.component.html',
  styleUrls: ['./actividad-data.component.css']
})
export class ActividadDataComponent implements OnInit, DoCheck {

  @Input() assignments: Assignment[] = [];
  totalPercentComplete: number = 0;
  meanScore: number = 0;
  totalScore: number = 0


  constructor() { }

  ngDoCheck(): void {
    if (this.assignments) {
      this.totalPercentComplete = 0;
      this.meanScore = 0;
      this.totalScore = 0;
      this.assignments.forEach(assignment => {

        let score = 0;
        let sumFinishAssignment = 0;
        this.totalPercentComplete += assignment.percent || 0;

        if (assignment.finish) {
          this.totalScore += ((assignment.percent || 0) / 100) * (assignment.score || 0);
          score += assignment.score || 0;
          sumFinishAssignment++;
        }
        if(score === 0 && sumFinishAssignment === 0){
          this.meanScore = 0;
        }else{
          this.meanScore = score/sumFinishAssignment;
        }
      })
    }
  }



  ngOnInit(): void {
  }

}
