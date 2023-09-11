import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private _courses$ = new BehaviorSubject<Course[]>([]);
  private courses$ = this._courses$.asObservable();

  columns: string[] = ['id', 'name', 'startDate', 'endDate'];
  getExecuted = false;

  get observable(): Observable<Course[]> {
    return this.courses$;
  }

  get subject(): BehaviorSubject<Course[]> {
    return this._courses$;
  }

  constructor(private httpClient: HttpClient) {}

  getCourses() {
    this.httpClient.get<Course[]>(`http://localhost:3000/courses`)
      .subscribe((data) => {
        this.subject.next(data);
        this.getExecuted = true;
      });
  }

  getCourseInscriptions(courseId: number) {
    return this.httpClient.get<Course[]>(`http://localhost:3000/inscriptions?courseId=${courseId}&_expand=student`);
  }

  deleteCourseInscription(inscriptionId: number) {
    return this.httpClient.delete(`http://localhost:3000/inscriptions/${inscriptionId}`);
  }
}
