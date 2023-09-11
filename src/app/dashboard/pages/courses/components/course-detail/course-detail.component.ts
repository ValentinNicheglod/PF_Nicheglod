import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../courses.service';
import { Observable } from 'rxjs';
import { Course } from '../../models';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
  courseInscriptions: Observable<Course[]>;
  columns = ['name', 'email', 'actions'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coursesService: CoursesService,
    private _modalController: MatDialog
  ) {
    this.courseInscriptions = this._coursesService.getCourseInscriptions(data.course.id);
  }

  deleteStudentInscription(inscriptionId: number) {
    const modalRef = this._modalController.open(DialogComponent, {
      width: '300px',
      data: {
        buttonColor: 'warn',
        buttonText: 'Eliminar inscripción',
        title: `Eliminar estudiante del curso`,
        content: `¿Confirma que desea eliminar el estudiante del curso?`
      }
    });

    modalRef.afterClosed().subscribe((userConfirmation: boolean) => {
      if (userConfirmation) {
        this._coursesService.deleteCourseInscription(inscriptionId)
          .subscribe(() => {
            this.courseInscriptions = this._coursesService.getCourseInscriptions(this.data.course.id);
          })
      }
    });
  }
}
