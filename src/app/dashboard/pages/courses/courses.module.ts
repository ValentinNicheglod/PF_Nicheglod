import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
