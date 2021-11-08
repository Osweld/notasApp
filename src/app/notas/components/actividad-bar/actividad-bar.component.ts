import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../../interfaces/notas.interface';
import { ActivityModal } from '../../interfaces/utils.interface';
import { AssignmentService } from '../../services/assignment.service';

@Component({
  selector: 'app-actividad-bar',
  templateUrl: './actividad-bar.component.html',
  styleUrls: ['./actividad-bar.component.css']
})
export class ActividadBarComponent implements OnInit {

  @Input() assignments: Assignment[] = [];
  @Output() activeModal: EventEmitter<ActivityModal> = new EventEmitter();
  @Output() refreshAssignment:EventEmitter<boolean> = new EventEmitter();

  modal!: ActivityModal;

  constructor(private assignmentService:AssignmentService) { }

  ngOnInit(): void {
  }

  create() {
    this.modal = { active: true};
    this.activeModal.emit(this.modal);
  }


  edit(assignment: Assignment) {
    this.modal = { active: true, assignment: assignment };
    this.activeModal.emit(this.modal);
  }

  delete(assignment: Assignment) {
    this.assignmentService.deleteAssignment(assignment.id || 0)
    .subscribe(resp =>{
      this.refreshAssignment.emit(true)
    },error => {
    })
  }

}
