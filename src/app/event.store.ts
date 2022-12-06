import { Subject } from "rxjs";
import { Event } from "./user/event-root/dashboard/dashboard.store";

export class EventStore {
    private selectedEventSource = new Subject<Event>();

    selectedEvent$ = this.selectedEventSource.asObservable();

    constructor() { }

    setEvent(event: Event) {
        this.selectedEventSource.next(event);
    }
}