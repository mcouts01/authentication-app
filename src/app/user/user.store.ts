import { Injectable } from "@angular/core";
import { AuthService, User } from "@auth0/auth0-angular";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { combineLatestWith, Observable, switchMap } from "rxjs";
import { UserService } from "./user.service";

export interface UserProfile {
    user: User | null | undefined,
    profile: UserModel | null | undefined
}

export interface UserModel {
    userId: number;
    authId: string;
    firstName: string;
    lastName: string;
}

export interface UserState {
    userProfile: UserProfile;
}

@Injectable()
export class UserStore extends ComponentStore<UserState> {
    readonly userProfile$ = this.select(state => state.userProfile);

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {
        super({
            userProfile: {
                user: null,
                profile: null
            }
        });
    }

    public getUserProfile = this.effect((source: Observable<User>) => source.pipe(
        switchMap(user => this.userService.getUserProfile(user?.sub)),
        combineLatestWith(this.authService.user$),
        tapResponse(([profile, user]) => {
            this.updateUserProfile({user, profile});
        }, () => {}))
    );

    readonly updateUserProfile = this.updater((state, newUserProfile: UserProfile) => {
        return {
            ...state,
            userProfile: newUserProfile
        }
    });
}