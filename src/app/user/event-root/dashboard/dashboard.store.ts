import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AuthService, User } from "@auth0/auth0-angular";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { combineLatest, combineLatestWith, map, Observable, switchMap, tap, throwError } from "rxjs";
import { EventService } from "../../../event.service";

export interface Event {
    eventID: number;
    start: Date;
    end: Date;
    title: string;
    description: string | null | undefined;
}

export interface DashboardState {
    events: Event[];
}

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {

    readonly events$ = this.select(state => state.events);

    constructor(
        private readonly eventService: EventService
    ) {
        super({
            events: []
        });
    }

    public getEvents = this.effect((source: Observable<null>) => source.pipe(
        switchMap(() => this.eventService.getUpcomingEvents()),
        tapResponse(
            (events) => {
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

    readonly addEvent = this.updater((state, newEvent: Event) => {
        return {
            ...state,
            events: [...state.events, newEvent]
        };
    });
}