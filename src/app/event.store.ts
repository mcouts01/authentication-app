import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { combineLatest, map, Observable, share, Subject, switchMap, take, tap } from "rxjs";
import { EventService } from "./event.service";
import { Event } from "./user/event-root/dashboard/dashboard.store";

export interface EventState {
    selectedEvent: Event | null | undefined;
    eventList: Event[];
    registeredEvents: Event[];
}

@Injectable({
    providedIn: "root"
})
export class EventStore extends ComponentStore<EventState> {
    selectedEvent$ = this.select(state => state.selectedEvent);
    registeredEvents$ = this.select(state => state.registeredEvents);
    eventList$ = this.select(state => state.eventList);

    constructor(
        private readonly eventService: EventService,
        private readonly auth: AuthService
    ) {
        super({
            selectedEvent: null,
            eventList: [],
            registeredEvents: []
        });
    }

    readonly setEventFromID = this.effect((source: Observable<string>) => source.pipe(
        switchMap((id) => this.registeredEvents$.pipe(
            take(1),
            map((events: Event[]) => events.find(event => event.eventID === Number.parseInt(id))),
        )),
        tapResponse((event: Event | undefined) => {
            if(event !== undefined) {
                this.setEvent(event);
            }
        }, () => {})
    ));

    readonly getEventLists = this.effect((source: Observable<void>) => source.pipe(
        tap(() => {
            combineLatest([this.eventService.getUpcomingEvents(), this.auth.user$.pipe(take(1))]).subscribe(
                ([eventList, user]) => {
                    this.setRegisteredEvents(eventList.filter(event => user?.['https://www.auth-app.com/participant'].includes(`${event.eventID}`)));
                    this.setEventList(eventList.filter(event => !user?.['https://www.auth-app.com/participant'].includes(`${event.eventID}`)));
                }
            )
        })
    ));

    readonly setEvent = this.updater((state, newEvent: Event) => ({
        ...state,
        selectedEvent: newEvent
    }));

    readonly setEventList = this.updater((state, newEventList: Event[]) => ({
        ...state,
        eventList: newEventList
    }));

    readonly setRegisteredEvents = this.updater((state, newRegisteredEvents: Event[]) => ({
        ...state,
        registeredEvents: newRegisteredEvents
    }));

    readonly addRegisteredEvent = this.updater((state, newRegisteredEvent: Event) => ({
        ...state,
        registeredEvents: [...state.registeredEvents, newRegisteredEvent]
    }));

    readonly addEvent = this.updater((state, newRegisteredEvent: Event) => ({
        ...state,
        eventList: [...state.eventList, newRegisteredEvent]
    }));
}