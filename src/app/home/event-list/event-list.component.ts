import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/event.service';
import { Event } from 'src/app/user/dashboard/dashboard.store';

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
