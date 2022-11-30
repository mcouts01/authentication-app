import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Event } from './user/dashboard/dashboard.store';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  readonly api = "http://localhost:8080";

  constructor(private readonly http: HttpClient) {}

  getUpcomingEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(encodeURI(`${this.api}/event/upcoming`));
  }

  createEvent(event: FormGroup): Observable<Event> {
    return this.http.post<Event>(encodeURI(`${this.api}/event/`), event.value);
  }
}
