import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  columns: string[] = ['id', 'fullName', 'email'];

  get observable(): Observable<User[]> {
    return this.users$;
  }

  get subject(): BehaviorSubject<User[]> {
    return this._users$;
  }

  constructor(private httpClient: HttpClient) {}

  get users(): Observable<User[]> {
    return this.httpClient.get<User[]>(`http://localhost:3000/users`);
  }
}
