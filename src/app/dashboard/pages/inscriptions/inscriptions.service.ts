import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Inscription, InscriptionRequest, NameData } from './models';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private _inscriptions$ = new BehaviorSubject<Inscription[]>([]);
  private inscriptions$ = this._inscriptions$.asObservable();

  private _courseNames$ = new BehaviorSubject<NameData>({});
  public courseNames$ = this._courseNames$.asObservable();

  private _studentNames$ = new BehaviorSubject<NameData>({});
  public studentNames$ = this._studentNames$.asObservable();

  columns: string[] = ['id', 'studentName', 'courseName'];
  courseNames: NameData = {};
  studentNames: NameData = {};

  constructor(
    private _coursesService: CoursesService,
    private _studentsService: StudentsService,
    private _modalController: MatDialog,
    private store: Store
  ) {
    this.getCourseNames();
    this.getStudentsNames();
  }

  getCourseNames() {
    this._coursesService.observable
      .pipe(
        map((courses) => {
          if (!courses.length && !this._coursesService.getExecuted) {
            return this._coursesService.getCourses();
          }

          const courseObject = courses
            .reduce((obj, course) => {
              obj[course.id] = course.name;
              return obj;
            }, {} as NameData);
          return courseObject;
        })
      ).subscribe((courseNames) => {
        if (courseNames) {
          this._courseNames$.next(courseNames);
        }
      });
  }

  getStudentsNames() {
    this._studentsService.observable
      .pipe(
        map((students) => {
          if (!students.length && !this._studentsService.getExecuted) {
            return this._studentsService.getStudents();
          }

          const studentObject = students
            .reduce((obj, student) => {
              obj[student.id] = `${student.name} ${student.surname}`;
              return obj;
            }, {} as NameData);
          return studentObject;
        })
      ).subscribe((studentNames) => {
        if (studentNames) {
          this._studentNames$.next(studentNames);
        }
      });
  }

  openCreationModal(): void {
    const modalRef = this._modalController
      .open(InscriptionFormComponent, { width: '400px' });

    modalRef.afterClosed().subscribe((inscriptionData: InscriptionRequest) => {
      inscriptionData && this.store.dispatch(InscriptionsActions.createInscription({ data: inscriptionData }))
    });
  }

  get observable(): Observable<Inscription[]> {
    return this.inscriptions$;
  }

  get subject(): BehaviorSubject<Inscription[]> {
    return this._inscriptions$;
  }
}
