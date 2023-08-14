import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UserFormComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
