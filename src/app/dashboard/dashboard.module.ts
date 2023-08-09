import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { CoursesComponent } from './pages/courses/courses.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersModule } from './pages/users/users.module';

@NgModule({
  declarations: [
    CoursesComponent,
    HomeComponent,
    UsersComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    UsersModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
