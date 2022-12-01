import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { UserProfileService } from './user/dashboard/user-profile/user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class RegisteredGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly userService: UserProfileService
    ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.getUserProfile(user?.sub)),
      catchError((error) => {
        this.router.navigateByUrl('/user/registration');
        return of(false);
      }),
      map(() => true)
    )
  }
  
}
