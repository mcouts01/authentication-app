import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserProfileComponent } from './user/dashboard/user-profile/user-profile.component';
import { RegisteredGuard } from './registered.guard';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { EventRegistrationComponent } from './user/event-registration/event-registration.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  { path: 'event/:eventID', component: UserComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [RegisteredGuard] },
      { path: 'register', component: EventRegistrationComponent },
    ]
  },
  { 
    path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [RegisteredGuard]
  },
  {
    path: 'register', component: RegistrationComponent, pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
