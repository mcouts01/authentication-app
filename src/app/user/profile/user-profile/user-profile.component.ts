import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { catchError, combineLatest, filter, Observable, share, switchMap, tap, throwError } from 'rxjs';
import { UserProfile, UserStore } from '../../user.store';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile$!: Observable<UserProfile>;

  constructor(
    public auth: AuthService,
    private readonly userStore: UserStore
  ) { 
  }

  ngOnInit(): void {
    this.userProfile$ = this.userStore.userProfile$;
  }
}

