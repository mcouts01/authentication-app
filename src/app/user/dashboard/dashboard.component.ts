import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { catchError, combineLatest, filter, map, Observable, share, switchMap, tap, throwError, TimeoutError } from 'rxjs';
import { EventService } from '../../event.service';
import { DashboardStore } from './dashboard.store';
import { UserService } from './user-profile/user-profile.service';
import { UserModel } from './user-profile/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardStore]
})
export class DashboardComponent implements OnInit {
  userProfile$!: Observable<{
    user: User,
    profile: UserModel
  }>;

  selectedEvent$ = this.dashboardStore.selectedEvent$;

  constructor(
    private readonly dashboardStore: DashboardStore,
    private readonly eventService: EventService,
    public auth: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const sharedUser$: Observable<User> = this.auth.user$.pipe(
      filter((u): u is User => u != null),
      share()
    );

    this.userProfile$ = combineLatest({
      user: sharedUser$,
      profile: sharedUser$.pipe(
        switchMap(user => this.userService.getUserProfile(user?.sub)),
        catchError((error) => {
          return throwError(() => error);
        })
      )
    });
  }

}
