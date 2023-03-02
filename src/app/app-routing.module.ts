import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user/event-root/dashboard/dashboard.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { RegisteredGuard } from './registered.guard';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { EventRegistrationComponent } from './user/event-root/event-registration/event-registration.component';
import { EventRootComponent } from './user/event-root/event-root.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'event/:eventID', component: EventRootComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'register', component: EventRegistrationComponent },
        ]
      },
    ],
    canActivate: [RegisteredGuard]
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
