import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserProfileComponent } from './user/dashboard/user-profile/user-profile.component';
import { RegisteredGuard } from './registered.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'user', component: UserComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [RegisteredGuard] },
      { path: 'registration', component: RegistrationComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
