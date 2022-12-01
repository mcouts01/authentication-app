import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Event } from './dashboard/dashboard.store';

@Injectable()
export class UserService {

  private eventSelectedSource = new Subject<Event>();

  eventSelected$ = this.eventSelectedSource.asObservable();

  constructor() { }

  setEvent(event: Event) {
    this.eventSelectedSource.next(event);
  }
}
