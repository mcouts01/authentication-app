import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AuthService, User } from "@auth0/auth0-angular";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { combineLatest, combineLatestWith, map, Observable, switchMap, tap, throwError } from "rxjs";
import { EventService } from "../../../event.service";
import { UserProfileService } from "./dashboard.service";

export interface Event {
    eventID: number;
    start: Date;
    end: Date;
    title: string;
    description: string | null | undefined;
}

export interface DashboardState {
    events: Event[];
    userProfile: UserProfile;
}

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

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {

    readonly events$ = this.select(state => state.events);
    readonly userProfile$ = this.select(state => state.userProfile);

    constructor(
        private readonly eventService: EventService,
        private readonly authService: AuthService,
        private readonly userProfileService: UserProfileService
    ) {
        super({
            events: [],
            userProfile: {} as UserProfile
        });
    }

    public getUserProfile = this.effect((source: Observable<User>) => source.pipe(
        switchMap(user => this.userProfileService.getUserProfile(user?.sub)),
        combineLatestWith(this.authService.user$),
        tapResponse(([profile, user]) => {
            this.updateUserProfile({user, profile});
        }, () => {}))
    );

    public getEvents = this.effect((source: Observable<null>) => source.pipe(
        switchMap(() => this.eventService.getUpcomingEvents()),
        tapResponse(
            (events) => {
                console.log(events);
                this.updateEvents(events);
            }, () => {})
    ));

    public createEvent = this.effect((source: Observable<FormGroup>) => source.pipe(
            switchMap(event => this.eventService.createEvent(event)),
            tapResponse((response) => {
                this.addEvent(response);
            }, () => {}))
    );

    readonly updateEvents = this.updater((state, newEvents: Event[]) => {
        return {
            ...state,
            events: newEvents
        };
    });

    readonly updateUserProfile = this.updater((state, newUserProfile: UserProfile) => {
        return {
            ...state,
            userProfile: newUserProfile
        }
    });

    readonly addEvent = this.updater((state, newEvent: Event) => {
        return {
            ...state,
            events: [...state.events, newEvent]
        };
    });
}