import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { catchError, combineLatest, filter, map, Observable, share, switchMap, tap, throwError, TimeoutError } from 'rxjs';
import { EventService } from '../../event.service';
import { DashboardStore } from './dashboard.store';
import { UserProfileService } from './user-profile/user-profile.service';
import { UserModel } from './user-profile/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ DashboardStore ]
})
export class DashboardComponent implements OnInit {
  @Input('selectedEvent') selectedEvent!: number;

  userProfile$!: Observable<{
    user: User,
    profile: UserModel
  }>;

  selectedEvent$ = this.dashboardStore.selectedEvent$;

  constructor(
    private readonly dashboardStore: DashboardStore,
    public auth: AuthService,
    private readonly userProfileService: UserProfileService,
    private readonly eventService: EventService,
  ) { }

  ngOnInit(): void {
    const sharedUser$: Observable<User> = this.auth.user$.pipe(
      filter((u): u is User => u != null),
      share()
    );

    this.userProfile$ = combineLatest({
      user: sharedUser$,
      profile: sharedUser$.pipe(
        switchMap(user => this.userProfileService.getUserProfile(user?.sub)),
        catchError((error) => {
          return throwError(() => error);
        })
      )
    });

    this.dashboardStore.getSelectedEvent(null);
  }

}
