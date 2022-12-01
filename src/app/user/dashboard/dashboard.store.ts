import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap } from "rxjs";
import { EventService } from "../../event.service";
import { UserService } from "../user.service";

export interface Event {
    id: number;
    start: Date;
    end: Date;
    title: string;
    description: string | null | undefined;
}

export interface DashboardState {
    events: Event[];
    selectedEvent: Event | null | undefined;
}

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {

    readonly selectedEvent$ = this.select(state => state.selectedEvent);
    readonly events$ = this.select(state => state.events);

    constructor(
        private readonly eventService: EventService,
        private readonly userService: UserService
    ) {
        super({
            events: [],
            selectedEvent: null
        });
    }

    public getSelectedEvent = this.effect((source: Observable<null>) => source.pipe(
        switchMap(() => this.userService.eventSelected$.pipe(
            tapResponse(
                (e: Event) => this.updateEvent(e),
                () => {}
            )
        ))
    ));

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

    readonly updateEvent = this.updater((state, newEvent: Event) => {
        return {
            ...state,
            selectedEvent: newEvent
        };
    });

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