import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/types';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {

  @Input() users: User[] = [];
  @Output() openEditUserModal: EventEmitter<number> = new EventEmitter();
  @Output() openDeleteUserConfirmation: EventEmitter<number> = new EventEmitter();
  columns: string[] = ['id', 'fullName', 'email', 'actions'];

  /* users = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'janesmith@example.com' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bobjohnson@example.com' }
  ]; */
}
