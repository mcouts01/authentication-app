import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { EventService } from '../event.service';
import { Event } from './dashboard/dashboard.store';

@Component({
  selector: 'app-user',
  templateUrl: './event-root.component.html',
  styleUrls: ['./event-root.component.scss'],
})
export class EventRootComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => this.eventService.getEventByID(params['eventID']))
    ).subscribe((e: Event) => this.eventService.setEvent(e));
  }

}
