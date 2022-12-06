import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { UserModel } from './user.store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private lastProfile: { id: string | null | undefined, profile$: Observable<UserModel>} | null = null;
  readonly api = "http://localhost:8080";

  constructor(private readonly http: HttpClient) {}
  
  getUserProfile(userAuthId: string | null | undefined): Observable<UserModel> {
      if (userAuthId != this.lastProfile?.id) {
          this.lastProfile = {
              id: userAuthId,
              profile$: this.http.get<UserModel>(encodeURI(`${this.api}/user/get/authID/`)).pipe(
                  shareReplay(1)
              )
          };
      }
      return this.lastProfile!.profile$;
  }
}
