import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { catchError, combineLatest, filter, map, Observable, share, switchMap, tap, throwError, TimeoutError } from 'rxjs';
import { EventService } from '../../../event.service';
import { DashboardStore, Event, UserProfile } from './dashboard.store';
import { UserProfileService } from './dashboard.service';
import { UserModel } from './dashboard.store';
import { EventStore } from 'src/app/event.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ DashboardStore ]
})
export class DashboardComponent implements OnInit {

  userProfile$!: Observable<UserProfile>;
  selectedEvent$!: Observable<Event>;

  constructor(
    private readonly dashboardStore: DashboardStore,
    public auth: AuthService,
    private readonly eventStore: EventStore,
  ) { }

  ngOnInit(): void {
    this.dashboardStore.getUserProfile(this.auth.user$);
    this.selectedEvent$ = this.eventStore.selectedEvent$;
    this.userProfile$ = this.dashboardStore.userProfile$;
  }

}
