import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UsersComponent } from "./pages/users/users.component";
import { CoursesComponent } from "./pages/courses/courses.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
