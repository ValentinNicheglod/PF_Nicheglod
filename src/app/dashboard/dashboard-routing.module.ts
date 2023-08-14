import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UsersComponent } from "./pages/users/users.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { StudentsComponent } from "./pages/students/students.component";
import { InscriptionsComponent } from "./pages/inscriptions/inscriptions.component";
import { adminGuard } from "../core/guards/admin.guard";

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'users',
      canActivate: [adminGuard],
      component: UsersComponent,
      loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule)
    },
    {
      path: 'courses',
      component: CoursesComponent,
      loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
    },
    {
      path: 'students',
      component: StudentsComponent,
      loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule)
    },
    {
      path: 'inscriptions',
      component: InscriptionsComponent,
      loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule)
    },
    {
      path: '**',
      redirectTo: 'home',
    },
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
