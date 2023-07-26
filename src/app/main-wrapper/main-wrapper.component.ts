import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/types';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.scss']
})
export class MainWrapperComponent {
  @Input() users: User[] = [];
  @Output() openEditUserModal: EventEmitter<number> = new EventEmitter();
  @Output() openDeleteUserConfirmation: EventEmitter<number> = new EventEmitter();

}
