import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { NotasService } from '../../services/notas.service';
import { Activity, ActivityNumber, Assignment } from '../../interfaces/notas.interface';
import { AssignmentService } from '../../services/assignment.service';
import { ActivityModal } from '../../interfaces/utils.interface';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit, DoCheck {
  refreshAssignment: boolean = false;
  activityModal!: ActivityModal
  activities!: Activity[];
  activityNumbers!: ActivityNumber[];
  assignments!: Assignment[];


  constructor(private route: ActivatedRoute, private notasService: NotasService,
    private assignmentService: AssignmentService) { }

  ngDoCheck(): void {
    if (this.refreshAssignment) {
      this.route.params.pipe(
        switchMap(({ id }) => this.assignmentService.getAllAssignment(id))
      ).subscribe(resp => this.assignments = resp.assignment,_ => {this.assignments = []});
      this.refreshAssignment = false;
    }
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.assignmentService.getAllAssignment(id))
    ).subscribe(resp => { this.assignments = resp.assignment},_ => {this.assignments = []});

    this.notasService.getActivity()
      .subscribe(resp => this.activities = resp.activity)
    this.notasService.getActivityNumber()
      .subscribe(resp => this.activityNumbers = resp.activityNumber)
  }

  openModal(modal: ActivityModal) {
    this.activityModal = modal;
  }

  refreshAssignments(refresh: boolean) {
    this.refreshAssignment = refresh;
  }


}
