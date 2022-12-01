import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './header/auth-button/auth-button.component';
import { UserProfileComponent } from './user/dashboard/user-profile/user-profile.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileService } from './user/dashboard/user-profile/user-profile.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { TeamManagementComponent } from './user/dashboard/team-management/team-management.component';
import { EventManagementComponent } from './user/dashboard/event-management/event-management.component';
import { EventDisplayComponent } from './header/event-display/event-display.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './home/event-list/event-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    UserProfileComponent,
    RegistrationComponent,
    HeaderComponent,
    DashboardComponent,
    TeamManagementComponent,
    EventManagementComponent,
    EventDisplayComponent,
    UserComponent,
    HomeComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-1sbfgqaflladxea5.us.auth0.com',
      clientId: 'jLnvnLP6bvgoyKmju2TYRKWD39nHsOiE',
      audience: 'https://auth-application.com/api',

      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:8080/user/*',
            tokenOptions: {
              audience: 'https://auth-application.com/api'
            }
          },
          {
            uri: 'http://localhost:8080/event/',
            tokenOptions: {
              audience: 'https://auth-application.com/api'
            }
          },
          {
            uri: 'http://localhost:8080/event/get/*',
            tokenOptions: {
              audience: 'https://auth-application.com/api'
            }
          },
        ]
      }
    })
  ],
  providers: [
    UserProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
