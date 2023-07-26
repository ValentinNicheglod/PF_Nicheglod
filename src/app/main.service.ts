import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

  /* get users() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  } */

  constructor() {
    // this.users = localStorage.getItem('users');
  }

  getUsers(): Observable<User[]> {
    const users = localStorage.getItem('users');
    return users ? of(JSON.parse(users)) : of([]);
  }

  createUser(newUser: User) {
    this.getUsers().subscribe((currentUsers) => {
      newUser.id = currentUsers.length++;

      const users = currentUsers[0]
        ? [...currentUsers, newUser].filter(user => typeof user === 'object')
        : [newUser]

      localStorage.setItem('users', JSON.stringify(users));
    });
  }
}
