import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './models';
import { StudentsService } from './students.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  columns: string[];
  students: Observable<Student[]>;

  constructor(
    private _studentsService: StudentsService,
    private _dashboardService: DashboardService
  ) {
    this.students = this._studentsService.observable;
    this.columns = this._studentsService.columns;
  }

  openEditStudentModal(student: Student): void {
    this._dashboardService.openEditionModal({ student });
  }

  openDeleteStudentConfirmation(studentId: number) {
    this._dashboardService.openDeleteConfirmation(studentId, 'estudiante');
  }
}
