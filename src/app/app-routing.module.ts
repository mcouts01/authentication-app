import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './event-root/dashboard/dashboard.component';
import { RegistrationComponent } from './event-root/registration/registration.component';
import { RegisteredGuard } from './registered.guard';
import { EventRootComponent } from './event-root/event-root.component';
import { HomeComponent } from './home/home.component';
import { EventRegistrationComponent } from './event-root/event-registration/event-registration.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  { path: 'event/:eventID', component: EventRootComponent,
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
