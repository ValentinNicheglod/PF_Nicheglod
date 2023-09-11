import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { Course } from './models/index';
import { Observable } from 'rxjs';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  columns: string[];
  courses: Observable<Course[]>;

  constructor(
    private _coursesService: CoursesService,
    private _dashboardService: DashboardService,
  ) {
    this.courses = this._coursesService.observable;
    this.columns = this._coursesService.columns;
  }

  openCourseDetailModal(course: Course): void {
    this._dashboardService.openDetailModal({ course });
  }

  openEditCourseModal(course: Course): void {
    this._dashboardService.openEditionModal({ course });
  }

  openDeleteCourseConfirmation(courseId: number) {
    this._dashboardService.openDeleteConfirmation(courseId, 'curso');
  }
}

