import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from '../../event.service';
import { Event } from '../../event-root/dashboard/dashboard.store';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events$!: Observable<Event[]>;

  constructor(
    private readonly eventService: EventService
  ) { }

  ngOnInit(): void {
    this.events$ = this.eventService.getUpcomingEvents();
  }

}
