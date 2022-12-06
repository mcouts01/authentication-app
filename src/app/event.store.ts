import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, Subject, switchMap, tap } from "rxjs";
import { EventService } from "./event.service";
import { Event } from "./user/event-root/dashboard/dashboard.store";

export interface EventState {
    selectedEvent: Event | null | undefined;
}

@Injectable()
export class EventStore extends ComponentStore<EventState> {
    selectedEvent$ = this.select(state => state.selectedEvent);

    constructor(
        private readonly eventService: EventService
    ) {
        super({
            selectedEvent: null
        });
    }

    readonly setEventFromID = this.effect((source: Observable<number>) => source.pipe(
        switchMap((id) => this.eventService.getEventByID(id)),
        tapResponse((event) => {
            this.setEvent(event);
        }, () => {})
    ));

    readonly setEvent = this.updater((state, newEvent: Event) => {
        return {
            ...state,
            selectedEvent: newEvent
        };
    });

}