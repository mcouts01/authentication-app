import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, tap } from 'rxjs';
import { Event } from './event-root/dashboard/dashboard.store';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  readonly api = "http://localhost:8080";

  private eventSelectedSource = new Subject<Event>();

  eventSelected$ = this.eventSelectedSource.asObservable();

  constructor(private readonly http: HttpClient) { }

  setEvent(event: Event) {
    this.eventSelectedSource.next(event);
  }

  getUpcomingEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(encodeURI(`${this.api}/event/upcoming`));
  }

  createEvent(event: FormGroup): Observable<Event> {
    return this.http.post<Event>(encodeURI(`${this.api}/event/`), event.value);
  }

  getEventByID(eventID: number): Observable<Event> {
    return this.http.get<Event>(encodeURI(`${this.api}/event/get/${eventID}`));
  }
}
