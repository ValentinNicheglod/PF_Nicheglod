import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NewUser, User } from './models';
import { usersList } from './mocks/user-mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private httpClient: HttpClient) {
    this._users$.next(usersList);
  }

  createUser(user: NewUser) {
    this.httpClient.post<User>('http://localhost:3000/users', user)
      .pipe(
        mergeMap((newUser: User) => this.users$.pipe(
          take(1),
          map(
            (currentUsers) => [...currentUsers, newUser])
        ))
      )
      .subscribe({
        next: (users) => this._users$.next(users)
      })
  }

  deleteUser(userId: number) {
    this.httpClient.delete<User>(`http://localhost:3000/users/${userId}`)
      .pipe(
        mergeMap(() => this.users$.pipe(
          take(1),
          map((currentUsers) => currentUsers.filter((user) => user.id !== userId))
        ))
      )
      .subscribe({
        next: (users) => this._users$.next(users)
      })
  }

  editUser(user: User) {
      this.httpClient.put<User>(`http://localhost:3000/users/${user.id}`, user)
      .pipe(
        mergeMap(() => this.users$.pipe(
          take(1),
          map((currentUsers) => currentUsers.filter((_user) => _user.id !== user.id))
        ))
      )
      .subscribe({
        next: () => this.getUsers()
      })
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.users$.pipe(
      take(1),
      map((users) => users.find((u) => u.id === id))
    )
  }

  getUsers(): Observable<User[]> {
    this.httpClient.get<User[]>('http://localhost:3000/users').subscribe({
      next: (users) => this._users$.next(users)
    })
    return this.users$;
  }
}
