import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { catchError, combineLatest, filter, Observable, share, switchMap, tap, throwError } from 'rxjs';
import { UserProfileService } from './user-profile.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile$!: Observable<{
    user: User,
    profile: UserModel
  }>;

  constructor(
    public auth: AuthService,
    private readonly userService: UserProfileService,
    private readonly router: Router
  ) { 
  }

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

const isNotUndefined = <T>(value: T | null | undefined): value is T  => {
  return value != null;
}