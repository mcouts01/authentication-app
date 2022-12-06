import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { catchError, combineLatest, filter, Observable, share, switchMap, tap, throwError } from 'rxjs';
import { UserProfileService } from '../dashboard.service';
import { DashboardStore, UserModel, UserProfile } from '../dashboard.store';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile$!: Observable<UserProfile>;

  constructor(
    public auth: AuthService,
    private readonly dashboardStore: DashboardStore
  ) { 
  }

  ngOnInit(): void {
    this.userProfile$ = this.dashboardStore.userProfile$;
  }
}

const isNotUndefined = <T>(value: T | null | undefined): value is T  => {
  return value != null;
}