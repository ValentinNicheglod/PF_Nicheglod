import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, map, mergeMap, take } from 'rxjs';
import { UserFormComponent } from './pages/users/components/user-form/user-form.component';
import { CourseFormComponent } from './pages/courses/components/course-form/course-form.component';
import { UsersService } from './pages/users/users.service';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from './pages/courses/courses.service';
import { StudentsService } from './pages/students/students.service';
import { StudentFormComponent } from './pages/students/components/student-form/student-form.component';
import { InscriptionFormComponent } from './pages/inscriptions/components/inscription-form/inscription-form.component';
import { InscriptionsService } from './pages/inscriptions/inscriptions.service';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './pages/inscriptions/store/inscriptions.actions';
import { isAdminUser } from '../store/auth.selector';

interface HeaderData {
  title: string;
  buttonText?: string | null;
}

interface SectionData {
  formComponent: any;
  service: any;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  headerData: Subject<HeaderData> = new Subject();
  currentSectionData?: SectionData;
  currentPage: 'home' | 'users' | 'courses' | 'students' | 'inscriptions' | string = 'home';
  isAdminUser: Observable<boolean>;

  constructor(
    private _coursesService: CoursesService,
    private _inscriptionsService: InscriptionsService,
    private _studentsService: StudentsService,
    private _usersService: UsersService,
    private _modalController: MatDialog,
    private router: Router,
    private store: Store,
    private httpClient: HttpClient
  ) {
    this.isAdminUser = store.select(isAdminUser);
    this.setPageData(router.url.split('/').pop());

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentPage = router.url.split('/').pop();
        if (currentPage && router.url.includes('dashboard')) {
          this.currentPage = currentPage;
          this.setPageData(currentPage);
          this.getAll();
        }
      }
    });
  }

  setPageData(currentPage?: string) {
    switch (currentPage) {
      case 'home': {
        this.headerData.next({
          title: 'Inicio'
        })
        break;
      }
      case 'users': {
        this.headerData.next({
          title: 'Usuarios',
          buttonText: 'Crear Usuario'
        })
        this.currentSectionData = {
          service: this._usersService,
          formComponent: UserFormComponent
        }
        break;
      }
      case 'students': {
        this.headerData.next({
          title: 'Estudiantes',
          buttonText: this.isAdminUser ? 'Crear Estudiante' : null
        })
        this.currentSectionData = {
          service: this._studentsService,
          formComponent: StudentFormComponent,
        }
        break;
      }
      case 'inscriptions': {
        this.headerData.next({
          title: 'Inscripciones',
          buttonText: 'Crear inscripción'
        })
        this.currentSectionData = {
          service: this._inscriptionsService,
          formComponent: InscriptionFormComponent,
        }
        break;
      }
      case 'courses': {
        this.headerData.next({
          title: 'Cursos',
          buttonText: this.isAdminUser ? 'Crear Curso' : null
        })
        this.currentSectionData = {
          service: this._coursesService,
          formComponent: CourseFormComponent,
        }
        break;
      }
    }

    const tableColumns: string[] = this.currentSectionData?.service.columns;
    if (this.isAdminUser && !tableColumns?.includes('actions')) {
      tableColumns?.push('actions');
    }
  }

  openCreationModal(): void {
    const modalRef = this._modalController
      .open(this.currentSectionData?.formComponent, { width: '400px' });

    modalRef.afterClosed().subscribe((data) => {
      data && this.create(data);
    });
  }

  create(data: any) {
    this.httpClient.post(`http://localhost:3000/${this.currentPage}`, data)
      .pipe(
        mergeMap((response) => this.currentSectionData?.service.observable.pipe(
          take(1),
          map(
            (currentData: any) => [...currentData, response])
        ))
      )
      .subscribe({
        next: (data) => this.currentSectionData?.service.subject.next(data)
      })
  }

  openEditionModal(data: object): void {
    const modalRef = this._modalController
      .open(this.currentSectionData?.formComponent, {
        width: '400px',
        data
      });

    modalRef.afterClosed().subscribe((data) => {
      data && this.edit(data);
    });
  }

  edit(data: any) {
    this.httpClient.put(`http://localhost:3000/${this.currentPage}/${data.id}`, data)
      .subscribe(() => this.getAll())
  }

  openDeleteConfirmation(
    id: number,
    dataType: 'usuario' | 'curso' | 'estudiante' | 'inscripción',
    prefixDataType?: 'el' | 'la'
  ) {
    const modalRef = this._modalController.open(DialogComponent, {
      width: '300px',
      data: {
        buttonColor: 'warn',
        buttonText: 'Eliminar',
        title: `Eliminar ${dataType}`,
        content: `¿Confirma que desea eliminar ${prefixDataType || 'el'} ${dataType}?`
      }
    });

    modalRef.afterClosed().subscribe((userConfirmation: boolean) => {
      if (userConfirmation) {
        this.delete(id);
      }
    });
  }

  delete(id: number) {
    this.httpClient.delete(`http://localhost:3000/${this.currentPage}/${id}`)
      .pipe(
        mergeMap(() => this.currentSectionData?.service.observable.pipe(
          take(1),
          map((currentData: any) => currentData.filter((value: any) => value.id !== id))
        ))
      )
      .subscribe({
        next: (data) => {
          this.currentSectionData?.service.subject.next(data);
          if (this.currentPage === 'inscriptions') {
            this.store.dispatch(InscriptionsActions.loadInscriptions());
          }
        }
      })
  }

  getAll(page?: string) {
    this.httpClient.get(`http://localhost:3000/${page || this.currentPage}`).subscribe({
      next: (data) => {
        this.currentSectionData?.service.subject.next(data);
        if (this.currentPage === 'inscriptions') {
          this.store.dispatch(InscriptionsActions.loadInscriptions());
        }
      }
    })
  }

  getById(id: number) {
    return this.currentSectionData?.service.observable.pipe(
      take(1),
      map((data: any[]) => data.find((value) => value.id === id))
    )
  }
}
