import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();

  columns: string[] = ['id', 'name', 'email', 'creationDate'];
  getExecuted = false;

  get observable(): Observable<Student[]> {
    return this.students$;
  }

  get subject(): BehaviorSubject<Student[]> {
    return this._students$;
  }

  constructor(private httpClient: HttpClient) {}

  getStudents() {
    this.httpClient.get<Student[]>(`http://localhost:3000/students`)
      .subscribe((data) => {
        this.subject.next(data);
        this.getExecuted = true;
      });
  }
}
